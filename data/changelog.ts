export type ChangelogCategory = "feature" | "content" | "seo" | "fix" | "infrastructure" | "design";

export interface ChangelogEntry {
  date: string;
  title: string;
  description: string;
  category: ChangelogCategory;
  items: string[];
}

// LYL Realty Group changelog — static seed.
// Live changelog rows for this client (Supabase slug `tauro-realty`) feed
// the Supabase-driven changelog UI; this file is the read-only fallback.

export const changelog: ChangelogEntry[] = [
  {
    date: "2026-05-18",
    title: "Content handoff captured — agent roster cleared",
    description: "Recorded the 5/18 content handoff meeting with Dayhna, Tony, and Noah. Brand and contact details locked, full agent roster wiped from the site pending Noah's refreshed list.",
    category: "content",
    items: [
      "Final brand confirmed: LYL Realty Group (Exit Benchmark and Tauro Realty are retired)",
      "Confirmed office: 6329 Germantown Ave, Philadelphia, PA 19144 — phone 267-773-8600 — email info@lylrealty.com",
      "Per Tony Goodman's go-ahead: every active agent removed from the site until a refreshed roster arrives",
      "Logo treatment locked: all-white logo on dark backgrounds, matching the team T-shirt design",
      "LYL Management kept fully separate from LYL Realty Group per legal advice — no cross-linking",
      "Reusable property page + brochure engine (PDF + shareable URL) confirmed inside original quote — kicks off after remaining balance + workflow sign-off",
      "Listing in motion: 1001 West Allen Lane — Dayhna delivering details for the first property page",
      "Feedback workflow set: Noah will record annotated Loom walkthroughs flagging placeholder copy",
      "Brand assets + listing photos flowing through the team Dropbox folder Noah manages",
    ],
  },
  {
    date: "2026-05-18",
    title: "Progress portal launched",
    description: "Dedicated LYL Realty Group dashboard deployed.",
    category: "feature",
    items: [
      "Standalone Vercel deployment for LYL Realty Group (not the shared portal)",
      "Pulls live changelog + action items from Supabase under slug tauro-realty",
      "Branded with the dark + white treatment locked in on the 5/18 call",
      "Powered by AI Acrobatics",
    ],
  },
  {
    date: "2026-05-15",
    title: "Deal reset + Sunday listing push",
    description: "Julian and Dayhna walked through the full payment cadence, GHL deferral, and the Sunday $1.2M listing appointment.",
    category: "content",
    items: [
      "$7,500 website + $5,000 GHL setup ($300/mo) honored as the original package",
      "GHL setup + monthly deferred 8 months FREE — Dayhna decides month 9",
      "Brand decision: keep LYL Realty Group (no Tauro rebrand) and existing color scheme",
      "Codebase cleanup queued to strip Tauro/Toro SEO + naming references",
    ],
  },
];

export const changelogStats = {
  totalEntries: changelog.length,
  featuresShipped: changelog.filter((e) => e.category === "feature").length,
  infrastructureUpdates: changelog.filter((e) => e.category === "infrastructure").length,
  contentDelivered: changelog.filter((e) => e.category === "content").length,
};
