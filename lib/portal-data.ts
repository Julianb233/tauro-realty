// LYL Realty Portal — single-tenant Convex read adapter.
//
// Reads from aa-portals Convex deployment (dev:quick-beagle-88) for the
// canonical tenant slug "tauro-realty" (LYL Realty Group's Convex identity).
//
// Pattern copied from /opt/agency-workspace/ai-acrobatics-portal/lib/portal-data.ts
// (Wave B multi-tenant shim), simplified to single-tenant by hardcoding the slug.
//
// Why fetch() not the Convex client SDK: /api/query is a stateless POST that
// takes {path, args, format} and returns {status, value}. Using fetch() avoids
// pulling the full Convex React client bundle into the Next.js server.
//
// Caching: intentionally disabled (cache: "no-store") so the portal always
// reads fresh Convex state. Convex is the cache.

const TENANT_SLUG = "tauro-realty";
const CONVEX_URL =
  process.env.NEXT_PUBLIC_CONVEX_URL ?? "https://quick-beagle-88.convex.cloud";

async function convexQuery<T = unknown>(
  funcPath: string,
  args: Record<string, unknown>,
): Promise<T[]> {
  try {
    const r = await fetch(`${CONVEX_URL}/api/query`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path: funcPath, args, format: "json" }),
      cache: "no-store",
    });
    if (!r.ok) {
      console.error(`[lyl-portal-data] ${funcPath} → ${r.status}`);
      return [];
    }
    const json = (await r.json()) as { status?: string; value?: unknown };
    if (json.status !== "success") {
      console.error(`[lyl-portal-data] ${funcPath} non-success:`, json);
      return [];
    }
    if (Array.isArray(json.value)) return json.value as T[];
    if (json.value == null) return [];
    return [json.value as T];
  } catch (err) {
    console.error(`[lyl-portal-data] ${funcPath} threw:`, err);
    return [];
  }
}

// ─────────────────────────────────────────────────────────
// Changelog
// ─────────────────────────────────────────────────────────

export interface ConvexChangelogEntry {
  id: string;
  title: string;
  description: string | null;
  category: string;
  items: string[] | null;
  date: string; // ISO string for display
}

interface RawChangelog {
  _id: string;
  tenantSlug: string;
  title: string;
  description?: string;
  category?: string;
  items?: string[];
  createdAt: number;
}

function adaptChangelog(c: RawChangelog): ConvexChangelogEntry {
  return {
    id: c._id,
    title: c.title,
    description: c.description ?? null,
    category: c.category ?? "improvement",
    items: c.items ?? null,
    date: new Date(c.createdAt).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  };
}

export async function getChangelog(limit = 50): Promise<ConvexChangelogEntry[]> {
  const rows = await convexQuery<RawChangelog>("changelog:listForTenant", {
    tenantSlug: TENANT_SLUG,
    limit,
  });
  return rows.map(adaptChangelog);
}

// ─────────────────────────────────────────────────────────
// Action Items
// ─────────────────────────────────────────────────────────

export interface ConvexActionItem {
  id: string;
  title: string;
  description: string | null;
  status: "pending" | "submitted" | "overdue" | "approved";
  priority: "high" | "medium" | "low";
  dueDate: string | null;
}

interface RawActionItem {
  _id: string;
  tenantSlug: string;
  title: string;
  description?: string;
  status: string;
  priority: string;
  dueDate?: number;
}

const CONVEX_PRIORITY_TO_LOCAL: Record<string, "high" | "medium" | "low"> = {
  urgent: "high",
  high: "high",
  normal: "medium",
  low: "low",
};

function adaptActionItem(c: RawActionItem): ConvexActionItem {
  return {
    id: c._id,
    title: c.title,
    description: c.description ?? null,
    status: (["pending","submitted","overdue","approved"].includes(c.status)
      ? c.status
      : "pending") as ConvexActionItem["status"],
    priority: CONVEX_PRIORITY_TO_LOCAL[c.priority] ?? "medium",
    dueDate: c.dueDate
      ? new Date(c.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
      : null,
  };
}

export async function getActionItems(): Promise<ConvexActionItem[]> {
  const rows = await convexQuery<RawActionItem>("actionItems:listForTenant", {
    tenantSlug: TENANT_SLUG,
  });
  return rows.map(adaptActionItem);
}

// ─────────────────────────────────────────────────────────
// Feed Entries (Activity)
// ─────────────────────────────────────────────────────────

export interface ConvexFeedEntry {
  id: string;
  title: string;
  description: string | null;
  category: string;
  date: string;
}

interface RawFeedEntry {
  _id: string;
  tenantSlug: string;
  title: string;
  description?: string;
  category: string;
  createdAt: number;
}

function adaptFeedEntry(c: RawFeedEntry): ConvexFeedEntry {
  return {
    id: c._id,
    title: c.title,
    description: c.description ?? null,
    category: c.category,
    date: new Date(c.createdAt).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  };
}

export async function getFeedEntries(limit = 50): Promise<ConvexFeedEntry[]> {
  const rows = await convexQuery<RawFeedEntry>("feedEntries:listForTenant", {
    tenantSlug: TENANT_SLUG,
  });
  return rows.slice(0, limit).map(adaptFeedEntry);
}

// ─────────────────────────────────────────────────────────
// Deliverables
// ─────────────────────────────────────────────────────────

export interface ConvexDeliverable {
  id: string;
  title: string;
  description: string | null;
  status: "delivered" | "in-progress" | "planned";
  category: string | null;
  url: string | null;
  deliveredDate: string | null;
}

interface RawDeliverable {
  _id: string;
  tenantSlug: string;
  title: string;
  description?: string;
  status: string;
  category?: string;
  url?: string;
  deliveredDate?: number;
}

function adaptDeliverable(c: RawDeliverable): ConvexDeliverable {
  const statusMap: Record<string, ConvexDeliverable["status"]> = {
    delivered: "delivered",
    "in-progress": "in-progress",
    planned: "planned",
    approved: "delivered",
    in_progress: "in-progress",
  };
  return {
    id: c._id,
    title: c.title,
    description: c.description ?? null,
    status: statusMap[c.status] ?? "planned",
    category: c.category ?? null,
    url: c.url ?? null,
    deliveredDate: c.deliveredDate
      ? new Date(c.deliveredDate).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
      : null,
  };
}

export async function getDeliverables(): Promise<ConvexDeliverable[]> {
  const rows = await convexQuery<RawDeliverable>("deliverables:listForTenant", {
    tenantSlug: TENANT_SLUG,
  });
  return rows.map(adaptDeliverable);
}
