// ============================================================
// MEETINGS & KEY DECISIONS — LYL Realty Group
// ============================================================

export interface MeetingDecision {
  decision: string;
  status: "implemented" | "in-progress" | "pending" | "deferred";
  linkedDeliverable?: string;
}

export interface MeetingActionItem {
  item: string;
  owner: "agency" | "client";
  status: "done" | "in-progress" | "pending";
}

export interface MeetingTakeaway {
  text: string;
  category: "insight" | "requirement" | "concern" | "priority" | "feedback";
}

export interface Meeting {
  id: string;
  title: string;
  date: string;
  duration: string;
  attendees: string[];
  summary: string;
  takeaways: MeetingTakeaway[];
  decisions: MeetingDecision[];
  actionItems: MeetingActionItem[];
  transcriptUrl?: string;
  recordingUrl?: string;
}

export const meetings: Meeting[] = [
  {
    id: "m-2026-05-18",
    title: "LYL Realty content handoff with Noah",
    date: "2026-05-18",
    duration: "30 min",
    attendees: ["Dayhna Carroll", "Tony Goodman", "Noah", "Julian Bradley"],
    summary:
      "First call with Noah to lock the brand and start the content handoff. Final brand confirmed as LYL Realty Group; LYL Management stays legally separate. Tony authorized clearing the current agent roster until a vetted list arrives. Brochure engine confirmed inside the original quote.",
    takeaways: [
      { text: "LYL Realty Group is final — Exit Benchmark and Tauro Realty are off the table", category: "requirement" },
      { text: "LYL Management must stay legally separate — no backlinks, no cross-mentions", category: "concern" },
      { text: "Brochure output needs to be both downloadable PDF and shareable URL so it can drop into Constant Contact / GHL", category: "requirement" },
      { text: "Noah will use Loom for placeholder-copy feedback — no more live walkthroughs", category: "feedback" },
      { text: "Property accuracy is critical — every detail needs a check-and-balance step before publishing", category: "priority" },
    ],
    decisions: [
      { decision: "Final brand: LYL Realty Group", status: "implemented" },
      { decision: "Office: 6329 Germantown Ave, 267-773-8600, info@lylrealty.com", status: "implemented" },
      { decision: "All-white logo on dark backgrounds", status: "implemented" },
      { decision: "Remove every active agent from the site until refreshed roster arrives", status: "implemented" },
      { decision: "Reusable property page + brochure engine inside original quote", status: "in-progress" },
      { decision: "Approval workflow + supplier/reviewer/turnaround SLA", status: "pending" },
    ],
    actionItems: [
      { item: "Compile + email refreshed agent roster (12 fields each) to julian@aiacrobatics.com", owner: "client", status: "pending" },
      { item: "Send 1001 West Allen Lane listing details for the first property page", owner: "client", status: "pending" },
      { item: "Drop brand assets into the team Dropbox folder Noah manages", owner: "client", status: "pending" },
      { item: "Record Loom walkthroughs flagging placeholder copy", owner: "client", status: "pending" },
      { item: "Build the back-end brochure engine after payment + workflow lock", owner: "agency", status: "pending" },
    ],
    transcriptUrl: "https://app.fireflies.ai/view/01KRXT84385AKNTQETBCWAXAPF",
  },
  {
    id: "m-2026-05-15",
    title: "Dayhna Carroll call — deal reset + Sunday listing push",
    date: "2026-05-15",
    duration: "20 min",
    attendees: ["Dayhna Carroll", "Julian Bradley"],
    summary:
      "Re-walked the $7,500 site + $5,000 GHL deal, $1,250 already paid, and the Sunday $1.2M listing appointment. Locked the brand decision to keep LYL Realty Group (no Tauro rebrand) and queued the codebase cleanup of Tauro/Toro naming.",
    takeaways: [
      { text: "Dayhna is paying in pieces — the 1-pay discount window has closed", category: "feedback" },
      { text: "GHL setup + monthly deferred 8 months free", category: "feedback" },
      { text: "Keep the existing brand and color scheme — signs already use it", category: "requirement" },
    ],
    decisions: [
      { decision: "Keep LYL Realty Group brand — do not rebrand to Tauro", status: "implemented" },
      { decision: "GHL deferred 8 months free; Dayhna decides month 9", status: "implemented" },
    ],
    actionItems: [
      { item: "Send $2,500 to reach 50% deposit", owner: "client", status: "pending" },
      { item: "Provide BlueHost / GoDaddy login for DNS cutover", owner: "client", status: "pending" },
      { item: "Strip Tauro / Toro SEO + naming references from the codebase", owner: "agency", status: "in-progress" },
    ],
  },
];

export function getAllDecisions(): (MeetingDecision & { meetingTitle: string; meetingDate: string })[] {
  return meetings.flatMap((m) =>
    m.decisions.map((d) => ({ ...d, meetingTitle: m.title, meetingDate: m.date }))
  );
}

export function getPendingDecisions() {
  return getAllDecisions().filter((d) => d.status === "pending" || d.status === "deferred");
}

export function getImplementedDecisions() {
  return getAllDecisions().filter((d) => d.status === "implemented");
}

export const meetingStats = {
  total: meetings.length,
  totalDecisions: meetings.reduce((n, m) => n + m.decisions.length, 0),
  implementedDecisions: getAllDecisions().filter((d) => d.status === "implemented").length,
  pendingActions: meetings.reduce(
    (n, m) => n + m.actionItems.filter((a) => a.status === "pending").length,
    0
  ),
};
