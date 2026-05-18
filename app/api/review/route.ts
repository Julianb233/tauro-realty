// Review route — fire-and-forget deliverable review capture.
// Primary write: Convex aa-portals /api/request (tenant: tauro-realty).
// Fallback write: Supabase portal_reviews (kept during 30-day soak period).
// Tolerance level unchanged from before the cutover — errors are caught and
// logged but never surface to the client (existing behaviour).

import { NextResponse } from "next/server";

const CONVEX_SITE_URL =
  process.env.NEXT_PUBLIC_CONVEX_URL?.replace(".cloud", ".site") ??
  "https://quick-beagle-88.convex.site";
const PORTALS_API_KEY = process.env.FLEET_PORTALS_API_KEY ?? "";

export async function POST(req: Request) {
  const body = await req.json();
  const { itemId, itemType, action, comment, clientSlug } = body;

  if (!itemId || !itemType || !action) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  // Primary write: Convex requests table (fire-and-forget)
  if (PORTALS_API_KEY) {
    try {
      await fetch(`${CONVEX_SITE_URL}/api/request`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${PORTALS_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tenantSlug: "tauro-realty",
          source: "review",
          body: `Review action: ${action} on ${itemType} ${itemId}${comment ? ` — ${comment}` : ""}`,
          status: "done",
        }),
      });
    } catch (err) {
      console.error("Convex review insert failed:", err);
    }
  }

  // Fallback write: Supabase portal_reviews (30-day soak)
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
