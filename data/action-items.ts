export type ActionPriority = "high" | "medium" | "low";
export type ActionStatus = "pending" | "submitted" | "completed";

export interface ActionItem {
  id: string;
  title: string;
  description: string;
  status: ActionStatus;
  dueDate: string;
  priority: ActionPriority;
  instructions: string[];
}

export const actionItems: ActionItem[] = [
  {
    id: "ai-roster",
    title: "Send the refreshed agent roster",
    description:
      "Per Tony's go-ahead on the 5/18 call, every current agent was removed from the site. Need Noah and Dayhna to send the full active roster so the team page can republish.",
    status: "pending",
    dueDate: "May 23, 2026",
    priority: "high",
    instructions: [
      "Compile every active agent on the team",
      "For each agent include: name, title, headshot photo, phone, email, bio, specialties, neighborhoods, awards, designations, social links, preferred display order",
      "Email the full roster + photos to julian@aiacrobatics.com",
      "Confirm the display order Tony wants on the public team page",
    ],
  },
  {
    id: "ai-allen-lane",
    title: "Send 1001 West Allen Lane listing details",
    description:
      "First reusable property page needs the listing details from Dayhna so Julian can build the page and brochure.",
    status: "pending",
    dueDate: "May 21, 2026",
    priority: "high",
    instructions: [
      "Send the full listing details: address, price, sqft, beds, baths, lot size, year built, features, descriptions",
      "Send the listing photos to the Dropbox folder Noah manages",
      "Flag any details that need to stay private vs go on the public page",
      "Confirm the listing agent name + contact for the page",
    ],
  },
  {
    id: "ai-approval-workflow",
    title: "Define the content approval workflow (Dayhna + Tony)",
    description:
      "Decide who supplies content for each listing, who reviews, who signs off, and what the turnaround time looks like. Brochure engine can't ship cleanly without this.",
    status: "pending",
    dueDate: "May 22, 2026",
    priority: "high",
    instructions: [
      "Meet with Tony offline and walk through the listing lifecycle",
      "Lock the answers: supplier / reviewer / sign-off / turnaround SLA",
      "Send the decision to julian@aiacrobatics.com so the back-end mirrors it",
      "Flag whether a staging/preview step is required before the public push",
    ],
  },
  {
    id: "ai-brand-assets",
    title: "Drop brand assets into the team Dropbox",
    description:
      "Logos, hero photos, lifestyle imagery, any extras for the site. Noah manages the Dropbox folder.",
    status: "pending",
    dueDate: "May 21, 2026",
    priority: "medium",
    instructions: [
      "Drop primary logo files (SVG + PNG if possible) into the LYL Dropbox folder",
      "Include any approved brand photography, lifestyle shots, office photos",
      "Confirm Julian has access to the folder",
      "Flag anything that should stay internal vs go on the public site",
    ],
  },
  {
    id: "ai-loom-feedback",
    title: "Send Loom walkthroughs flagging placeholder copy (Noah)",
    description:
      "Replace live walkthroughs with annotated screen recordings. Noah records what needs updating; Julian replaces without a meeting.",
    status: "pending",
    dueDate: "May 23, 2026",
    priority: "medium",
    instructions: [
      "Sign up at loom.com (free)",
      "Record screen walkthroughs of the site flagging placeholder copy",
      "Comment on each piece of copy that needs replacement with the real text",
      "Send the Loom links to julian@aiacrobatics.com",
    ],
  },
  {
    id: "ai-bluehost-login",
    title: "Send domain registrar login for DNS cutover",
    description:
      "The new site is built but lylrealty.com is still pointing at the old WordPress. Need BlueHost or GoDaddy login to swing DNS to the new Vercel deployment.",
    status: "pending",
    dueDate: "May 21, 2026",
    priority: "medium",
    instructions: [
      "Locate the BlueHost or GoDaddy account login (whichever currently controls lylrealty.com DNS)",
      "Send credentials to julian@aiacrobatics.com via secure note, 1Password share, or text",
      "Or add julian@aiacrobatics.com as a manager so we never have to ask again",
    ],
  },
];

export function getPendingActionItems(): ActionItem[] {
  return actionItems.filter((item) => item.status === "pending");
}

export function getOverdueActionItems(): ActionItem[] {
  const now = new Date();
  return actionItems.filter((item) => {
    if (item.status !== "pending") return false;
    const due = new Date(item.dueDate);
    return due < now;
  });
}
