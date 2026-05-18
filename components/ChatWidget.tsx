"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { clientInfo } from "@/data/client-data";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  mediaUrl?: string;
  mediaType?: string;
  timestamp: Date;
}

type InputMode = "text" | "recording";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function uid(): string {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function ChatWidget() {
  // Panel open / close
  const [open, setOpen] = useState(false);

  // Messages
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content: `Hi ${clientInfo.contact.name}! I'm your project assistant powered by AI Acrobatics. Ask me about your project status, submit a change request, or upload a screenshot of what you'd like updated.`,
      timestamp: new Date(),
    },
  ]);

  // Input state
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [inputMode, setInputMode] = useState<InputMode>("text");

  // Media state
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const [mediaFile, setMediaFile] = useState<File | null>(null);

  // Voice recording
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // Scroll
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ------------------------------------------------------------------
  // Send text message -> Claude streaming API
  // ------------------------------------------------------------------
  const sendTextMessage = useCallback(
    async (text: string) => {
      if (!text.trim() && !mediaFile) return;

      const userMsg: ChatMessage = {
        id: uid(),
        role: "user",
        content: text,
        mediaUrl: mediaPreview ?? undefined,
        mediaType: mediaFile?.type,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMsg]);
      setInput("");
      setIsStreaming(true);

      // If there is a media attachment, route to Gemini
      if (mediaFile) {
        await sendMediaMessage(text, mediaFile);
        setMediaPreview(null);
        setMediaFile(null);
        setIsStreaming(false);
        return;
      }

      // Text-only -> Claude streaming
      const assistantId = uid();
      setMessages((prev) => [
        ...prev,
        { id: assistantId, role: "assistant", content: "", timestamp: new Date() },
      ]);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: [...messages, userMsg].map((m) => ({
              role: m.role,
              content: m.content,
            })),
          }),
        });

        if (!res.ok) {
          throw new Error(`Chat API error: ${res.status}`);
        }

        const reader = res.body?.getReader();
        const decoder = new TextDecoder();
        let accumulated = "";

        if (reader) {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            const chunk = decoder.decode(value, { stream: true });
            accumulated += chunk;
            setMessages((prev) =>
              prev.map((m) =>
                m.id === assistantId ? { ...m, content: accumulated } : m
              )
            );
          }
        }
      } catch (err) {
        console.error("Chat error:", err);
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId
              ? {
                  ...m,
                  content:
                    "Sorry, I had trouble connecting. Please try again or text Julian directly at julian@aiacrobatics.com.",
                }
              : m
          )
        );
      } finally {
        setIsStreaming(false);
      }
    },
    [messages, mediaFile, mediaPreview]
  );

  // ------------------------------------------------------------------
  // Send media -> Gemini Flash multimodal API
  // ------------------------------------------------------------------
  const sendMediaMessage = async (caption: string, file: File) => {
    const assistantId = uid();
    setMessages((prev) => [
      ...prev,
      { id: assistantId, role: "assistant", content: "Analyzing your upload...", timestamp: new Date() },
    ]);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("caption", caption);

      const res = await fetch("/api/chat/media", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error(`Media API error: ${res.status}`);

      const data = await res.json();
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId ? { ...m, content: data.response } : m
        )
      );
    } catch (err) {
      console.error("Media upload error:", err);
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId
            ? { ...m, content: "I couldn't process that file. Try again or describe the change in text." }
            : m
        )
      );
    }
  };

  // ------------------------------------------------------------------
  // Voice recording -> Whisper transcription
  // ------------------------------------------------------------------
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        stream.getTracks().forEach((track) => track.stop());
        await transcribeAudio(audioBlob);
      };

      mediaRecorder.start();
      setIsRecording(true);
      setInputMode("recording");
    } catch (err) {
      console.error("Mic access error:", err);
      alert("Microphone access is needed for voice messages. Please allow microphone access and try again.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
    setInputMode("text");
  };

  const transcribeAudio = async (audioBlob: Blob) => {
    const transcribeId = uid();
    setMessages((prev) => [
      ...prev,
      { id: transcribeId, role: "system", content: "Transcribing your voice message...", timestamp: new Date() },
    ]);

    try {
      const formData = new FormData();
      formData.append("audio", audioBlob, "recording.webm");

      const res = await fetch("/api/chat/voice", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error(`Voice API error: ${res.status}`);

      const data = await res.json();

      // Remove the "transcribing..." message
      setMessages((prev) => prev.filter((m) => m.id !== transcribeId));

      // Insert the transcription as a user message and send it
      if (data.transcript) {
        const userMsg: ChatMessage = {
          id: uid(),
          role: "user",
          content: `[Voice message] ${data.transcript}`,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, userMsg]);

        // Now send the transcript to Claude for a response
        setIsStreaming(true);
        const assistantId = uid();
        setMessages((prev) => [
          ...prev,
          { id: assistantId, role: "assistant", content: "", timestamp: new Date() },
        ]);

        const chatRes = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: [
              ...messages,
              userMsg,
            ].map((m) => ({ role: m.role === "system" ? "user" : m.role, content: m.content })),
          }),
        });

        if (chatRes.ok) {
          const reader = chatRes.body?.getReader();
          const decoder = new TextDecoder();
          let accumulated = "";
          if (reader) {
            while (true) {
              const { done, value } = await reader.read();
              if (done) break;
              accumulated += decoder.decode(value, { stream: true });
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === assistantId ? { ...m, content: accumulated } : m
                )
              );
            }
          }
        }
        setIsStreaming(false);
      }
    } catch (err) {
      console.error("Transcription error:", err);
      setMessages((prev) =>
        prev.map((m) =>
          m.id === transcribeId
            ? { ...m, role: "assistant" as const, content: "I couldn't transcribe that. Try again or type your message instead." }
            : m
        )
      );
    }
  };

  // ------------------------------------------------------------------
  // File picker
  // ------------------------------------------------------------------
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setMediaFile(file);
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => setMediaPreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setMediaPreview(null);
    }
  };

  const clearMedia = () => {
    setMediaFile(null);
    setMediaPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // ------------------------------------------------------------------
  // Key handler
  // ------------------------------------------------------------------
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendTextMessage(input);
    }
  };

  // ------------------------------------------------------------------
  // Render
  // ------------------------------------------------------------------
  return (
    <>
      {/* Floating button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Open chat"
          className="fixed bottom-[calc(env(safe-area-inset-bottom)+84px)] lg:bottom-6 right-4 lg:right-6 z-[60] w-14 h-14 rounded-full bg-blue-500 hover:bg-blue-600 text-white shadow-lg shadow-blue-500/25 transition-all duration-200 flex items-center justify-center hover:scale-105 active:scale-95"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443h.09c1.108-.086 2.206-.209 3.293-.369 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
            />
          </svg>
        </button>
      )}

      {/* Chat panel */}
      {open && (
        <div
          className="fixed inset-0 sm:inset-auto sm:bottom-[calc(env(safe-area-inset-bottom)+84px)] lg:sm:bottom-6 sm:right-4 lg:sm:right-6 z-[60] sm:w-[400px] sm:h-[600px] sm:max-h-[80vh] flex flex-col bg-white sm:rounded-2xl border border-gray-200 shadow-2xl overflow-hidden"
          role="dialog"
          aria-label="Project assistant chat"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                <svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-black">Project Assistant</h3>
                <p className="text-[10px] text-gray-600">Powered by AI Acrobatics</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Quick actions */}
          <div className="flex gap-2 px-4 py-2 border-b border-gray-100 overflow-x-auto scrollbar-none">
            <a
              href="https://msgsndr.com/widget/booking/76ergSktTpvayx9tldnl"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-medium whitespace-nowrap hover:bg-emerald-100 transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
              Book a Call
            </a>
            <button
              onClick={() => sendTextMessage("What's the current status of my project?")}
              disabled={isStreaming}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-medium whitespace-nowrap hover:bg-blue-100 transition-colors disabled:opacity-50"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75z" />
              </svg>
              Project Status
            </button>
            <button
              onClick={() => sendTextMessage("What action items do you need from me?")}
              disabled={isStreaming}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-xs font-medium whitespace-nowrap hover:bg-amber-100 transition-colors disabled:opacity-50"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08" />
              </svg>
              My Action Items
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4 bg-gray-50/50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-blue-500 text-white rounded-br-md"
                      : msg.role === "system"
                      ? "bg-gray-100 text-gray-700 rounded-bl-md italic text-xs border border-gray-200"
                      : "bg-white text-gray-700 rounded-bl-md border border-gray-200 shadow-sm"
                  }`}
                >
                  {/* Media preview in user message */}
                  {msg.mediaUrl && msg.mediaType?.startsWith("image/") && (
                    <img
                      src={msg.mediaUrl}
                      alt="Uploaded"
                      className="rounded-lg mb-2 max-h-40 object-cover"
                    />
                  )}
                  {msg.mediaUrl && !msg.mediaType?.startsWith("image/") && (
                    <div className="flex items-center gap-2 mb-2 px-3 py-2 rounded-lg bg-blue-400/20 text-xs text-white/80">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
                      </svg>
                      File attached
                    </div>
                  )}
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                </div>
              </div>
            ))}

            {/* Streaming indicator */}
            {isStreaming && messages[messages.length - 1]?.content === "" && (
              <div className="flex justify-start">
                <div className="bg-white rounded-2xl rounded-bl-md px-4 py-3 border border-gray-200 shadow-sm">
                  <div className="flex gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Media preview bar */}
          {mediaFile && (
            <div className="px-4 py-2 border-t border-gray-200 bg-gray-50 flex items-center gap-3">
              {mediaPreview ? (
                <img src={mediaPreview} alt="Preview" className="w-12 h-12 rounded-lg object-cover" />
              ) : (
                <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
                  <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                </div>
              )}
              <span className="text-xs text-gray-700 truncate flex-1">{mediaFile.name}</span>
              <button
                onClick={clearMedia}
                aria-label="Remove attachment"
                className="w-6 h-6 rounded-full hover:bg-gray-200 flex items-center justify-center"
              >
                <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}

          {/* Input area */}
          <div className="px-4 py-3 border-t border-gray-200 bg-white">
            {inputMode === "recording" ? (
              <div className="flex items-center justify-center gap-4 py-2">
                <div className="flex items-center gap-2 text-red-500 text-sm">
                  <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                  Recording...
                </div>
                <button
                  onClick={stopRecording}
                  aria-label="Stop recording"
                  className="w-12 h-12 rounded-full bg-red-50 hover:bg-red-100 text-red-500 flex items-center justify-center transition-colors border border-red-200"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <rect x="6" y="6" width="12" height="12" rx="2" />
                  </svg>
                </button>
              </div>
            ) : (
              <div className="flex items-end gap-2">
                {/* File upload button */}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  aria-label="Upload image or document"
                  className="flex-shrink-0 w-9 h-9 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-600 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
                  </svg>
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*,.pdf,.doc,.docx"
                  className="hidden"
                  onChange={handleFileSelect}
                />

                {/* Voice button */}
                <button
                  onClick={startRecording}
                  aria-label="Record voice message"
                  className="flex-shrink-0 w-9 h-9 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-600 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
                  </svg>
                </button>

                {/* Text input */}
                <div className="flex-1 relative">
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask about your project..."
                    disabled={isStreaming}
                    rows={1}
                    className="w-full resize-none rounded-xl bg-gray-50 border border-gray-200 px-4 py-2.5 text-sm text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-400 disabled:opacity-50 max-h-24"
                    aria-label="Chat message input"
                  />
                </div>

                {/* Send button */}
                <button
                  onClick={() => sendTextMessage(input)}
                  disabled={isStreaming || (!input.trim() && !mediaFile)}
                  aria-label="Send message"
                  className="flex-shrink-0 w-9 h-9 rounded-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-200 disabled:text-gray-600 text-white flex items-center justify-center transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
