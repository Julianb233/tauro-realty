import { NextRequest, NextResponse } from "next/server";

// ---------------------------------------------------------------------------
// POST /api/chat/media — Gemini Flash multimodal analysis
// ---------------------------------------------------------------------------

const GOOGLE_AI_API_KEY = process.env.GOOGLE_AI_API_KEY;

export async function POST(req: NextRequest) {
  if (!GOOGLE_AI_API_KEY) {
    return NextResponse.json(
      {
        response:
          "Media analysis is not configured yet. Please describe the change you'd like in text, or contact julian@aiacrobatics.com.",
      },
      { status: 200 }
    );
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const caption = (formData.get("caption") as string) || "";

    if (!file) {
      return NextResponse.json(
        { response: "No file was uploaded. Please try again." },
        { status: 400 }
      );
    }

    // Convert file to base64 for Gemini API
    const bytes = await file.arrayBuffer();
    const base64 = Buffer.from(bytes).toString("base64");
    const mimeType = file.type || "application/octet-stream";

    const prompt = caption
      ? `The client uploaded this file with the message: "${caption}"\n\nAnalyze the content and describe what you see. If it appears to be a screenshot of a website or app, describe what changes the client likely wants. If it's a logo, branding asset, or document, extract the key information. Be concise and actionable.`
      : `The client uploaded this file. Analyze the content and describe what you see. If it appears to be a screenshot of a website or app, describe what it shows and suggest what changes might be intended. If it's a document or image, extract the key information. Be concise and actionable.`;

    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GOOGLE_AI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  inlineData: {
                    mimeType,
                    data: base64,
                  },
                },
                { text: prompt },
              ],
            },
          ],
          generationConfig: {
            maxOutputTokens: 1024,
            temperature: 0.4,
          },
        }),
      }
    );

    if (!geminiRes.ok) {
      const errorText = await geminiRes.text();
      console.error("Gemini API error:", geminiRes.status, errorText);
      return NextResponse.json(
        {
          response:
            "I couldn't analyze that file right now. Please describe the change in text instead, or try uploading again.",
        },
        { status: 200 }
      );
    }

    const data = await geminiRes.json();
    const responseText =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "I received your file but couldn't extract details. Could you describe what you'd like changed?";

    return NextResponse.json({
      response: `I've analyzed your upload:\n\n${responseText}\n\nI've logged this as a request — the team will follow up.`,
    });
  } catch (err) {
    console.error("Media route error:", err);
    return NextResponse.json(
      {
        response:
          "Something went wrong processing your file. Please try again or describe the change in text.",
      },
      { status: 200 }
    );
  }
}
