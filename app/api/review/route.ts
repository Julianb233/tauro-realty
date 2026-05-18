import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { itemId, itemType, action, comment, clientSlug } = body;

  if (!itemId || !itemType || !action) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  // Store review in Supabase if configured
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (supabaseUrl && supabaseKey) {
    try {
      await fetch(`${supabaseUrl}/rest/v1/portal_reviews`, {
        method: "POST",
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
        body: JSON.stringify({
          item_id: itemId,
          item_type: itemType,
          action,
          comment: comment || null,
          client_slug: clientSlug || null,
          created_at: new Date().toISOString(),
        }),
      });
    } catch (err) {
      console.error("Supabase review insert failed:", err);
    }
  }

  return NextResponse.json({ success: true, action, itemId });
}
