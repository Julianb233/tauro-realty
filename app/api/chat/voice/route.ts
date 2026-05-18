import { NextRequest, NextResponse } from "next/server";

// ---------------------------------------------------------------------------
// POST /api/chat/voice — Whisper transcription for voice messages
// ---------------------------------------------------------------------------

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export async function POST(req: NextRequest) {
  if (!OPENAI_API_KEY) {
    return NextResponse.json(
      {
        transcript: null,
        error:
          "Voice transcription is not configured yet. Please type your message instead.",
      },
      { status: 200 }
    );
  }

  try {
    const formData = await req.formData();
    const audio = formData.get("audio") as File | null;

    if (!audio) {
      return NextResponse.json(
        { transcript: null, error: "No audio file received." },
        { status: 400 }
      );
    }

    // Forward to OpenAI Whisper
    const whisperForm = new FormData();
    whisperForm.append("file", audio, "recording.webm");
    whisperForm.append("model", "whisper-1");
    whisperForm.append("language", "en");

    const res = await fetch("https://api.openai.com/v1/audio/transcriptions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: whisperForm,
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Whisper API error:", res.status, errorText);
      return NextResponse.json(
        {
          transcript: null,
          error: "Could not transcribe audio. Please try again or type your message.",
        },
        { status: 200 }
      );
    }

    const data = await res.json();
    return NextResponse.json({ transcript: data.text });
  } catch (err) {
    console.error("Voice route error:", err);
    return NextResponse.json(
      {
        transcript: null,
        error: "Something went wrong with transcription. Please try again.",
      },
      { status: 200 }
    );
  }
}
