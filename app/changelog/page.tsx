// Async server component — fetches changelog from Convex aa-portals
// (tenant: tauro-realty) and passes entries to the interactive client component.
// Static data/changelog.ts is no longer the source of truth for this page.

import { getChangelog } from "@/lib/portal-data";
import ChangelogClient from "./ChangelogClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ChangelogPage() {
  const entries = await getChangelog(50);
  return <ChangelogClient entries={entries} />;
}
