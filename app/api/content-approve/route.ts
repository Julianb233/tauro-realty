// Content approve route — updates content calendar item status.
// Uses fetch() directly (no @supabase/supabase-js SDK) to eliminate the
// Supabase client SDK dependency.
// portal_content_calendar has no Convex equivalent yet; writes go to
// Supabase REST API directly during the 30-day soak.
// Fire-and-forget tolerance level unchanged.

import { NextRequest, NextResponse } from "next/server";

const SUPABASE_URL = "https://jrirksdiklqwsaatbhvg.supabase.co";

export async function POST(req: NextRequest) {
  try {
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!serviceKey) {
      return NextResponse.json(
        { error: "Server configuration error: missing Supabase key" },
        { status: 500 }
      );
    }

    const body = await req.json();
    const { id, action, clientNote } = body as {
      id: string;
      action: "approve" | "reject";
      clientNote?: string;
    };

    if (!id || !action) {
      return NextResponse.json(
        { error: "Missing required fields: id and action" },
        { status: 400 }
      );
    }

    if (action !== "approve" && action !== "reject") {
      return NextResponse.json(
        { error: "Action must be 'approve' or 'reject'" },
        { status: 400 }
      );
    }

    const updateData: Record<string, unknown> = {
      status: action === "approve" ? "approved" : "rejected",
      updated_at: new Date().toISOString(),
    };

    if (action === "reject" && clientNote) {
      updateData.client_note = clientNote;
    }

    const r = await fetch(
      `${SUPABASE_URL}/rest/v1/portal_content_calendar?id=eq.${encodeURIComponent(id)}&select=*&limit=1`,
      {
        method: "PATCH",
        headers: {
          apikey: serviceKey,
          Authorization: `Bearer ${serviceKey}`,
          "Content-Type": "application/json",
          Prefer: "return=representation",
        },
        body: JSON.stringify(updateData),
      }
    );

    if (!r.ok) {
      const text = await r.text();
      console.error("Supabase content-calendar update error:", r.status, text);
      return NextResponse.json({ error: text }, { status: 500 });
    }

    const data = await r.json();
    return NextResponse.json({ success: true, data: data[0] ?? null });
  } catch (err) {
    console.error("Content approve API error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
