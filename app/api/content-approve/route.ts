import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabaseUrl = "https://jrirksdiklqwsaatbhvg.supabase.co";

export async function POST(req: NextRequest) {
  try {
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!serviceKey) {
      return NextResponse.json(
        { error: "Server configuration error: missing Supabase key" },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, serviceKey);

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

    const { data, error } = await supabase
      .from("portal_content_calendar")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Supabase update error:", error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error("Content approve API error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
