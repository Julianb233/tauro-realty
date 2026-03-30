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
  // REPLACE: Add real action items as they arise during the project
  {
    id: "ai-1",
    title: "Review website and provide feedback",
    description:
      "The production website is live. Walk through every page on both desktop and mobile. Let us know what looks good and what needs adjustment.",
    status: "pending",
    dueDate: "Apr 5, 2026",
    priority: "high",
    instructions: [
      "Visit the live website on both desktop and mobile",
      "Check each page: Homepage, About, Services, Contact, FAQ",
      "Note anything that needs updating: text, images, colors, layout",
      "Text or email your feedback -- screenshots are helpful",
      "If everything looks good, just reply 'Approved' and we will move forward",
    ],
  },
  {
    id: "ai-2",
    title: "Provide blog topics and approve content calendar",
    description:
      "We have drafted a 12-month content calendar based on keyword research. Review the topics and confirm they align with your business priorities.",
    status: "pending",
    dueDate: "Apr 10, 2026",
    priority: "medium",
    instructions: [
      "Review the content calendar shared via email",
      "Flag any topics that are off-brand or low priority",
      "Suggest 2-3 additional topics your customers frequently ask about",
      "Confirm the monthly publishing cadence works for your review schedule",
      "Reply via text or email with your feedback",
    ],
  },
  {
    id: "ai-3",
    title: "Share testimonials and client logos",
    description:
      "We need 3-5 customer testimonials and any client/partner logos for the website trust section. These significantly improve conversion rates.",
    status: "pending",
    dueDate: "Apr 15, 2026",
    priority: "medium",
    instructions: [
      "Collect 3-5 short testimonials from happy customers (2-3 sentences each)",
      "Include the person's name, title, and company if possible",
      "Share any client or partner logos you have permission to display",
      "Send via email or text -- we will format and place them on the site",
    ],
  },
  {
    id: "ai-4",
    title: "Set up Google Business Profile access",
    description:
      "We need manager access to your Google Business Profile to optimize it and set up automated posting. This is a key local SEO lever.",
    status: "pending",
    dueDate: "Apr 20, 2026",
    priority: "low",
    instructions: [
      "Go to business.google.com and sign in",
      "Navigate to your business listing",
      "Click 'Users' in the left sidebar and add julian@aiacrobatics.com as a Manager",
      "If you don't have a GBP listing, let us know and we will help create one",
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
