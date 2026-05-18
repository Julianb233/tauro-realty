export type MilestoneStatus = "completed" | "active" | "upcoming";

export interface MilestoneDeliverable {
  label: string;
  done: boolean;
}

export interface Phase {
  id: number;
  name: string;
  status: MilestoneStatus;
  description: string;
  deliverables: MilestoneDeliverable[];
  dateRange: string;
}

export interface Milestone {
  id: string;
  name: string;
  status: MilestoneStatus;
  description: string;
  timeframe: string;
  phases: Phase[];
}

export const milestones: Milestone[] = [
  {
    id: "m1",
    name: "M1 — Brand + content handoff",
    status: "completed",
    description: "Lock the final brand, contact info, and content workflow with Dayhna, Tony, and Noah.",
    timeframe: "May 2026",
    phases: [
      {
        id: 1,
        name: "Deal reset call",
        status: "completed",
        description: "Walk through pricing cadence, GHL deferral, and brand decision.",
        deliverables: [
          { label: "Pricing structure confirmed ($7,500 site + $5,000 GHL deferred 8mo)", done: true },
          { label: "Brand decision: keep LYL Realty Group", done: true },
          { label: "Codebase cleanup queued (strip Tauro/Toro)", done: true },
        ],
        dateRange: "May 15",
      },
      {
        id: 2,
        name: "Content handoff call (Noah)",
        status: "completed",
        description: "First call with Noah locking branding, contact info, agent reset, brochure engine scope.",
        deliverables: [
          { label: "Final brand confirmed: LYL Realty Group", done: true },
          { label: "Contact info confirmed on site", done: true },
          { label: "Logo treatment locked (white on dark)", done: true },
          { label: "Agent roster cleared per Tony's go-ahead", done: true },
          { label: "Brochure engine confirmed inside original quote", done: true },
        ],
        dateRange: "May 18",
      },
    ],
  },
  {
    id: "m2",
    name: "M2 — First listing + roster republish",
    status: "active",
    description: "Land the first reusable property page (1001 West Allen Lane) and republish the team page with the refreshed roster.",
    timeframe: "May–June 2026",
    phases: [
      {
        id: 3,
        name: "Refreshed agent roster",
        status: "active",
        description: "Noah and Dayhna compile the active roster with the 12 required fields per agent.",
        deliverables: [
          { label: "Full active agent list (with photos + bios + specialties)", done: false },
          { label: "Display order confirmed by Tony", done: false },
          { label: "Team page republished", done: false },
        ],
        dateRange: "Targeting late May",
      },
      {
        id: 4,
        name: "First property page — 1001 West Allen Lane",
        status: "active",
        description: "Listing details + photos from Dayhna, page + brochure built and shared.",
        deliverables: [
          { label: "Listing details from Dayhna", done: false },
          { label: "Photos uploaded to Dropbox", done: false },
          { label: "Property page built + reviewed", done: false },
          { label: "Brochure (PDF + URL) generated", done: false },
        ],
        dateRange: "Targeting late May",
      },
      {
        id: 5,
        name: "Approval workflow + brochure engine back end",
        status: "active",
        description: "Workflow defined by Dayhna + Tony, then back-end build kicks off after remaining payment.",
        deliverables: [
          { label: "Supplier / reviewer / sign-off / turnaround SLA defined", done: false },
          { label: "Remaining balance received", done: false },
          { label: "Back-end brochure engine built", done: false },
          { label: "Staging / preview workflow (if requested)", done: false },
        ],
        dateRange: "Targeting June",
      },
    ],
  },
  {
    id: "m3",
    name: "M3 — Domain cutover + MLS / IDX",
    status: "upcoming",
    description: "Swing lylrealty.com from the old WordPress to Vercel and bring MLS data into the site via IDX.",
    timeframe: "June+ 2026",
    phases: [
      {
        id: 6,
        name: "DNS cutover",
        status: "upcoming",
        description: "Point lylrealty.com at the Vercel deployment and retire the WordPress site.",
        deliverables: [
          { label: "BlueHost / GoDaddy login from Dayhna", done: false },
          { label: "DNS pointed at Vercel", done: false },
          { label: "Live verification on lylrealty.com", done: false },
        ],
        dateRange: "Targeting late May / June",
      },
      {
        id: 7,
        name: "MLS / IDX integration",
        status: "upcoming",
        description: "Pull live MLS listing data into the LYL Realty Group site.",
        deliverables: [
          { label: "MLS / IDX agreement signed by brokerage", done: false },
          { label: "Feed connected to site", done: false },
          { label: "Search / filters live", done: false },
        ],
        dateRange: "After cutover",
      },
    ],
  },
];

const totalPhases = milestones.reduce((n, m) => n + m.phases.length, 0);
const completedPhases = milestones.reduce(
  (n, m) => n + m.phases.filter((p) => p.status === "completed").length,
  0
);
const activeMilestone = milestones.find((m) => m.status === "active") ?? milestones[0];

export const milestoneProgress = {
  totalPhases,
  completedPhases,
  percentComplete: totalPhases === 0 ? 0 : Math.round((completedPhases / totalPhases) * 100),
  currentMilestone: activeMilestone?.name ?? "",
};

