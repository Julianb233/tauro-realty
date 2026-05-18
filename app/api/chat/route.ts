import { NextRequest } from "next/server";

// ---------------------------------------------------------------------------
// POST /api/chat — Claude streaming text chat
// ---------------------------------------------------------------------------

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const CLIENT_SLUG = process.env.CLIENT_SLUG || "client";

// Build a client-aware system prompt from the data files at build time.
// In production the data is imported statically; the API only sends what
// it needs per request.
function buildSystemPrompt(): string {
  return [
    `You are the AI assistant for the client's project portal, powered by AI Acrobatics (Julian Bradley's agency).`,
    `Client slug: ${CLIENT_SLUG}`,
    ``,
    `You can help with:`,
    `- Checking project status and progress`,
    `- Submitting change requests (these create Linear issues automatically)`,
    `- Reviewing deliverables and providing feedback`,
    `- Booking a support call with Julian — link: https://msgsndr.com/widget/booking/76ergSktTpvayx9tldnl`,
    ``,
    `When the client describes a change request or asks for something to be built/modified,`,
    `acknowledge the request and let them know it has been logged and the team will follow up.`,
    ``,
    `You do NOT know about other clients. You do NOT discuss pricing or contracts.`,
    `When unsure, say: "Let me flag this for Julian — he'll follow up directly."`,
    `Keep responses concise and helpful. Use plain language.`,
  ].join("\n");
}

export async function POST(req: NextRequest) {
  // If no API key, return a helpful fallback
  if (!ANTHROPIC_API_KEY) {
    return new Response(
      "I'm not fully configured yet — the Anthropic API key is missing. Please reach out to julian@aiacrobatics.com for help.",
      { status: 200, headers: { "Content-Type": "text/plain" } }
    );
  }

  const { messages } = await req.json();

  // Build the Anthropic messages payload
  const anthropicMessages = (messages || [])
    .filter((m: { role: string }) => m.role === "user" || m.role === "assistant")
    .map((m: { role: string; content: string }) => ({
      role: m.role,
      content: m.content,
    }));

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1024,
        system: buildSystemPrompt(),
        messages: anthropicMessages,
        stream: true,
      }),
    });

    if (!res.ok) {
      const errorBody = await res.text();
      console.error("Anthropic API error:", res.status, errorBody);
      return new Response(
        "Sorry, I had trouble connecting to the AI. Please try again in a moment.",
        { status: 200, headers: { "Content-Type": "text/plain" } }
      );
    }

    // Stream the SSE response back as plain text chunks
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        const reader = res.body?.getReader();
        const decoder = new TextDecoder();

        if (!reader) {
          controller.close();
          return;
        }

        let buffer = "";

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split("\n");
            buffer = lines.pop() || "";

            for (const line of lines) {
              if (line.startsWith("data: ")) {
                const data = line.slice(6).trim();
                if (data === "[DONE]") continue;

                try {
                  const parsed = JSON.parse(data);
                  if (
                    parsed.type === "content_block_delta" &&
                    parsed.delta?.type === "text_delta"
                  ) {
                    controller.enqueue(encoder.encode(parsed.delta.text));
                  }
                } catch {
                  // skip non-JSON lines
                }
              }
            }
          }
        } catch (err) {
          console.error("Stream processing error:", err);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
      },
    });
  } catch (err) {
    console.error("Chat route error:", err);
    return new Response(
      "Sorry, something went wrong. Please try again or contact julian@aiacrobatics.com.",
      { status: 200, headers: { "Content-Type": "text/plain" } }
    );
  }
}
