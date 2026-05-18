import type { ServiceSlug } from "./services";

export type DeliverableStatus = "delivered" | "in-progress" | "planned";
export type DeliverableType = "Website" | "Tool" | "Infrastructure" | "Strategy" | "Feature" | "Integration" | "Design" | "Document" | "Workflow" | "Agent";
export type ApprovalStatus = "none" | "pending-review" | "approved" | "changes-requested";

export interface DeliverableAsset {
  label: string;
  url: string;
  type: "link" | "image" | "diagram" | "document" | "video" | "workflow";
}

export interface DeliverableComment {
  author: string;
  date: string;
  text: string;
  type: "comment" | "suggestion" | "approval" | "change-request";
}

export interface Deliverable {
  name: string;
  description: string;
  type: DeliverableType;
  status: DeliverableStatus;
  service: ServiceSlug;
  deliveredDate?: string;
  url?: string;
  imageUrl?: string;
  assets?: DeliverableAsset[];
  approval?: ApprovalStatus;
  comments?: DeliverableComment[];
}

export const deliverables: Deliverable[] = [
  // --- Delivered ---
  {
    name: "Next Steps + What We Need From You (doc)",
    description: "Written brief covering every locked-in decision from the 5/18 call, the 6 things we need from you/Noah/Tony with due dates, and the path forward through each phase.",
    type: "Document",
    service: "website",
    status: "delivered",
    deliveredDate: "May 18, 2026",
    url: "https://docs.google.com/document/d/18JrhzYVOlVixmFXlWphR4a2FEvDuyMkpYBjbL2IG5_U/edit",
    approval: "pending-review",
    assets: [
      { label: "Open in Google Docs", url: "https://docs.google.com/document/d/18JrhzYVOlVixmFXlWphR4a2FEvDuyMkpYBjbL2IG5_U/edit", type: "document" },
    ],
    comments: [
      { author: "AI Acrobatics", date: "May 18", text: "Lives inside your team Drive folder under 02-Briefs/. Comment directly in the doc if anything needs adjusting.", type: "comment" },
    ],
  },
  {
    name: "Next Steps Path (diagram)",
    description: "Visual map of every phase, every input we need from you, and every milestone that closes a phase. Helps you see the path forward at a glance.",
    type: "Document",
    service: "website",
    status: "delivered",
    deliveredDate: "May 18, 2026",
    url: "https://whimsical.com/lyl-realty-group-next-steps-path-17atVEenpumHp3Qd9dmUdD",
    approval: "approved",
    assets: [
      { label: "Open in Whimsical", url: "https://whimsical.com/lyl-realty-group-next-steps-path-17atVEenpumHp3Qd9dmUdD", type: "diagram" },
    ],
  },
  {
    name: "Shared Google Drive folder",
    description: "Your team Drive folder with 5 subfolders: 01-Contracts, 02-Briefs, 03-Deliverables, 04-Meeting-Notes, 05-Assets. info@lylrealty.com has Editor access.",
    type: "Infrastructure",
    service: "website",
    status: "delivered",
    deliveredDate: "May 18, 2026",
    url: "https://drive.google.com/drive/folders/1W5gyTW-pSEF99tn_QS9g4znOrGpbu_pc",
    approval: "approved",
    assets: [
      { label: "Drive folder", url: "https://drive.google.com/drive/folders/1W5gyTW-pSEF99tn_QS9g4znOrGpbu_pc", type: "link" },
    ],
  },
  {
    name: "LYL Realty Group Progress Portal",
    description: "Dedicated client dashboard so you can see decisions, action items, deliverables, and meeting notes in one place.",
    type: "Website",
    service: "website",
    status: "delivered",
    deliveredDate: "May 18, 2026",
    url: "https://lyl-realty-portal.vercel.app",
    approval: "approved",
    assets: [
      { label: "Portal", url: "https://lyl-realty-portal.vercel.app", type: "link" },
    ],
  },
  {
    name: "5/18 Content Handoff — Meeting record",
    description: "Recorded the content handoff call with Dayhna, Tony, and Noah. Full decisions + action items captured.",
    type: "Document",
    service: "website",
    status: "delivered",
    deliveredDate: "May 18, 2026",
    approval: "approved",
    assets: [
      { label: "Fireflies transcript", url: "https://app.fireflies.ai/view/01KRXT84385AKNTQETBCWAXAPF", type: "link" },
    ],
  },
  {
    name: "Brand and contact info locked on site",
    description: "Final company name, office address, phone, and email confirmed and reflected on the under-construction landing page.",
    type: "Feature",
    service: "website",
    status: "delivered",
    deliveredDate: "May 18, 2026",
    approval: "approved",
  },
  {
    name: "Agent roster cleared",
    description: "Per Tony's go-ahead on the 5/18 call, every active agent profile removed from the site. Ready to republish once Noah delivers the refreshed list.",
    type: "Feature",
    service: "website",
    status: "delivered",
    deliveredDate: "May 18, 2026",
    approval: "approved",
  },
  {
    name: "Logo treatment locked",
    description: "All-white logo on dark backgrounds approved, matching the team T-shirts.",
    type: "Design",
    service: "website",
    status: "delivered",
    deliveredDate: "May 18, 2026",
    approval: "approved",
  },

  // --- In Progress ---
  {
    name: "Under-construction landing page",
    description: "Holding page on lylrealty.com while the full site is being prepared. Awaiting DNS cutover from the old WordPress.",
    type: "Website",
    service: "website",
    status: "in-progress",
    url: "https://lylrealty.com",
    approval: "pending-review",
    comments: [
      { author: "AI Acrobatics", date: "May 18", text: "Live URL still serves the old WordPress until DNS swings to Vercel. Awaiting BlueHost/GoDaddy login.", type: "comment" },
    ],
  },
  {
    name: "1001 West Allen Lane property page",
    description: "First reusable property page. Will showcase the listing with photos, details, and the brochure engine.",
    type: "Feature",
    service: "website",
    status: "in-progress",
    approval: "none",
    comments: [
      { author: "AI Acrobatics", date: "May 18", text: "Waiting on listing details + photos from Dayhna.", type: "comment" },
    ],
  },
  {
    name: "Reusable property page + brochure engine (back end)",
    description: "Build automation so any new listing becomes a property page + downloadable PDF + shareable URL with one input pass.",
    type: "Feature",
    service: "website",
    status: "in-progress",
    approval: "none",
    comments: [
      { author: "AI Acrobatics", date: "May 18", text: "Included in the original quote — kicks off after remaining payment + workflow lock from Dayhna and Tony.", type: "comment" },
    ],
  },

  // --- Planned ---
  {
    name: "Team page rebuild",
    description: "Republish the team page once Noah delivers the refreshed agent roster with all 12 required fields per agent.",
    type: "Feature",
    service: "website",
    status: "planned",
    approval: "none",
  },
  {
    name: "MLS / IDX integration",
    description: "Pull live MLS listing data into the LYL Realty Group site via IDX feed.",
    type: "Integration",
    service: "website",
    status: "planned",
    approval: "none",
  },
  {
    name: "GoHighLevel CRM setup (deferred 8 months free)",
    description: "Full GHL onboarding for LYL Realty Group. Setup and automations included; first 8 months of platform fees are free per the 5/15 agreement.",
    type: "Integration",
    service: "crm",
    status: "planned",
    approval: "none",
  },
];

// --- Helper functions ---

export function getDeliverablesByStatus(status: DeliverableStatus): Deliverable[] {
  return deliverables.filter((d) => d.status === status);
}

export function getDeliverablesByService(service: ServiceSlug): Deliverable[] {
  return deliverables.filter((d) => d.service === service);
}

export function getDeliverablesNeedingReview(): Deliverable[] {
  return deliverables.filter((d) => d.approval === "pending-review");
}

export const deliverableStats = {
  delivered: deliverables.filter((d) => d.status === "delivered").length,
  inProgress: deliverables.filter((d) => d.status === "in-progress").length,
  planned: deliverables.filter((d) => d.status === "planned").length,
  pendingReview: deliverables.filter((d) => d.approval === "pending-review").length,
  total: deliverables.length,
};
