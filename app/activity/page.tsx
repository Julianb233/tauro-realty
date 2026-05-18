// Async server component — fetches activity feed from Convex aa-portals
// (tenant: tauro-realty). Falls back to static recentActivity if Convex is empty.

import { getFeedEntries } from "@/lib/portal-data";
import { recentActivity } from "@/data/client-data";
import ActivityClient from "./ActivityClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ActivityPage() {
  const convexEntries = await getFeedEntries(50);
  // Fall back to static recentActivity if Convex feed is empty.
  const entries =
    convexEntries.length > 0
      ? convexEntries
      : recentActivity.map((a) => ({
          id: `static-${a.date}-${a.title}`.replace(/\s+/g, "-"),
          title: a.title,
          description: a.description,
          category: a.type,
          date: a.date,
        }));
  return <ActivityClient entries={entries} />;
}
