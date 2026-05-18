// ============================================================
// CLIENT DATA — LYL Realty Group
// Customized 2026-05-18 (AI-10116) from ppp-template
// Internal Supabase slug: tauro-realty (DO NOT rename without migration)
// ============================================================

export const clientInfo = {
  name: "LYL Realty Group",
  slug: "tauro-realty",
  contact: {
    name: "Dayhna",
    phone: "+12154983546",
  },
  domain: "lylrealty.com",
  portalDomain: "lyl-realty-portal.vercel.app",
  agency: "AI Acrobatics",
  agencyContact: "julian@aiacrobatics.com",
};

export const stats = [
  { label: "Brand", value: "Locked", trend: "up" as const },
  { label: "Office Info", value: "Confirmed", trend: "up" as const },
  { label: "Agent Roster", value: "Cleared", trend: "up" as const },
  { label: "Phase", value: "Content Handoff", trend: "up" as const },
];

export const hubLinks = [
  { label: "Next Steps Doc", url: "https://docs.google.com/document/d/18JrhzYVOlVixmFXlWphR4a2FEvDuyMkpYBjbL2IG5_U/edit", icon: "document", description: "What we need from you + the path forward" },
  { label: "Next Steps Diagram", url: "https://whimsical.com/lyl-realty-group-next-steps-path-17atVEenpumHp3Qd9dmUdD", icon: "map", description: "Visual map of every phase + dependency" },
  { label: "Team Drive Folder", url: "https://drive.google.com/drive/folders/1W5gyTW-pSEF99tn_QS9g4znOrGpbu_pc", icon: "package", description: "Shared Google Drive: contracts, briefs, deliverables, meeting notes, assets" },
  { label: "Live Website", url: "https://lylrealty.com", icon: "globe", description: "Production website (DNS cutover pending)" },
  { label: "Action Items", url: "/action-items", icon: "clipboard", description: "What we need from you" },
  { label: "Meeting Notes", url: "/meetings", icon: "document", description: "Recorded calls + summaries" },
  { label: "Changelog", url: "/changelog", icon: "list", description: "Detailed update history" },
  { label: "Book a Call", url: "https://msgsndr.com/widget/booking/76ergSktTpvayx9tldnl", icon: "phone", description: "Schedule with Julian" },
];

export const snapshot = {
  month: "May 2026",
  health: "great" as const,
  summary: "Content handoff complete with Noah — brand and contact info locked, agent roster cleared, ready for fresh team list + first property page.",
  highlights: [
    { label: "Final brand", value: "LYL Realty Group", icon: "check" },
    { label: "Office info", value: "Confirmed on site", icon: "check" },
    { label: "Agent roster", value: "Cleared for fresh list", icon: "check" },
    { label: "Brochure engine", value: "Inside original quote", icon: "lightning" },
  ],
  nextMonthFocus: [
    "Receive refreshed agent roster from Noah (12 fields per agent) and republish team page",
    "Build out first property page for 1001 West Allen Lane once Dayhna delivers listing details",
    "Finalize content approval workflow (Dayhna + Tony) so the brochure engine can ship",
  ],
};

export type ActivityType = "milestone" | "feature" | "infrastructure" | "planning" | "deploy" | "design" | "content";

export interface ActivityEntry {
  date: string;
  title: string;
  type: ActivityType;
  description: string;
}

export const recentActivity: ActivityEntry[] = [
  {
    date: "May 18",
    title: "Content handoff call with Noah",
    type: "planning",
    description: "30-minute call with Dayhna, Tony, and Noah locking final brand, contact info, agent-roster reset, and the workflow for property pages + brochures.",
  },
  {
    date: "May 18",
    title: "Agent roster cleared from the site",
    type: "content",
    description: "Per Tony Goodman's go-ahead, every active agent profile was removed from the codebase. Site will republish once Noah delivers the refreshed roster.",
  },
  {
    date: "May 18",
    title: "Progress portal launched",
    type: "deploy",
    description: "Dedicated LYL Realty Group portal deployed so you can see decisions, action items, deliverables, and meeting notes in one place.",
  },
  {
    date: "May 15",
    title: "Deal reset + Sunday listing push",
    type: "planning",
    description: "Julian + Dayhna re-walked the $7,500 site + $5,000 GHL package, payment cadence, and the Sunday $1.2M listing appointment.",
  },
  {
    date: "May 15",
    title: "Brand direction confirmed — keep LYL Realty Group",
    type: "design",
    description: "Decision locked: no Tauro rebrand, keep existing brand and color scheme. Codebase cleanup of Tauro/Toro naming queued.",
  },
];
