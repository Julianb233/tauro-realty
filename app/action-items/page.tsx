// Async server component — fetches action items from Convex aa-portals
// (tenant: tauro-realty). Falls back to static data if Convex returns empty,
// so the page is never blank while data is fresh.

import { getActionItems } from "@/lib/portal-data";
import { actionItems as staticItems } from "@/data/action-items";
import ActionItemsClient from "./ActionItemsClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ActionItemsPage() {
  const convexItems = await getActionItems();
  // If Convex has items, use them; otherwise fall back to static seed data.
  const items =
    convexItems.length > 0
      ? convexItems
      : staticItems.map((s) => ({
          id: s.id,
          title: s.title,
          description: s.description,
          status: (s.status === "completed" ? "approved" : s.status) as
            | "pending"
            | "submitted"
            | "overdue"
            | "approved",
          priority: s.priority as "high" | "medium" | "low",
          dueDate: s.dueDate,
        }));
  return <ActionItemsClient items={items} />;
}
