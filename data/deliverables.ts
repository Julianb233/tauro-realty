export type DeliverableStatus = "delivered" | "in-progress" | "planned";
export type DeliverableType = "Website" | "Tool" | "Infrastructure" | "Strategy" | "Feature" | "Integration";

export interface Deliverable {
  name: string;
  description: string;
  type: DeliverableType;
  status: DeliverableStatus;
  deliveredDate?: string;
}

export const deliverables: Deliverable[] = [
  // REPLACE: Add real deliverables as they are completed, started, or planned

  // --- Delivered ---
  {
    name: "Production Website",
    description: "Full responsive website deployed to custom domain with SSL and analytics.",
    type: "Website",
    status: "delivered",
    deliveredDate: "Mar 28, 2026",
  },
  {
    name: "Homepage Design & Development",
    description: "Hero section, services overview, testimonials, and conversion-optimized CTAs.",
    type: "Feature",
    status: "delivered",
    deliveredDate: "Mar 20, 2026",
  },
  {
    name: "About Page",
    description: "Company story, team bios, values section, and trust signals.",
    type: "Feature",
    status: "delivered",
    deliveredDate: "Mar 20, 2026",
  },
  {
    name: "Services Page",
    description: "Detailed service cards with descriptions, pricing hints, and CTAs.",
    type: "Feature",
    status: "delivered",
    deliveredDate: "Mar 20, 2026",
  },
  {
    name: "Contact Page with Form",
    description: "Contact form with validation, embedded map, and business info.",
    type: "Feature",
    status: "delivered",
    deliveredDate: "Mar 20, 2026",
  },
  {
    name: "FAQ Page",
    description: "Expandable accordion with 15+ frequently asked questions.",
    type: "Feature",
    status: "delivered",
    deliveredDate: "Mar 20, 2026",
  },
  {
    name: "SEO Foundation",
    description: "Meta tags, sitemap, robots.txt, structured data, GSC verification.",
    type: "Infrastructure",
    status: "delivered",
    deliveredDate: "Mar 25, 2026",
  },
  {
    name: "Design System & Brand Guide",
    description: "Color palette, typography, component library, responsive grid.",
    type: "Strategy",
    status: "delivered",
    deliveredDate: "Mar 18, 2026",
  },
  {
    name: "Content Strategy & Calendar",
    description: "12-month content plan with keyword targets and topic clusters.",
    type: "Strategy",
    status: "delivered",
    deliveredDate: "Mar 22, 2026",
  },
  {
    name: "Competitive Analysis Report",
    description: "8 competitors analyzed with SEO gaps and positioning recommendations.",
    type: "Strategy",
    status: "delivered",
    deliveredDate: "Mar 10, 2026",
  },
  {
    name: "Market Research & Personas",
    description: "Industry analysis, 3 audience personas, keyword opportunity matrix.",
    type: "Strategy",
    status: "delivered",
    deliveredDate: "Mar 5, 2026",
  },
  {
    name: "Progress Portal",
    description: "Client-facing dashboard with real-time project tracking and communication.",
    type: "Website",
    status: "delivered",
    deliveredDate: "Mar 30, 2026",
  },

  // --- In Progress ---
  {
    name: "Blog Section",
    description: "Blog index page, article template, and first 4 SEO-optimized articles.",
    type: "Feature",
    status: "in-progress",
  },
  {
    name: "Email Marketing Setup",
    description: "Newsletter signup, welcome sequence, and monthly digest automation.",
    type: "Integration",
    status: "in-progress",
  },

  // --- Planned ---
  {
    name: "CRM Integration",
    description: "Contact form submissions routed to CRM with lead scoring and follow-up automation.",
    type: "Integration",
    status: "planned",
  },
  {
    name: "Google Business Profile Optimization",
    description: "GBP audit, optimization, posting schedule, and review generation strategy.",
    type: "Strategy",
    status: "planned",
  },
  {
    name: "Landing Pages for Ad Campaigns",
    description: "3 conversion-optimized landing pages for Google Ads and social campaigns.",
    type: "Feature",
    status: "planned",
  },
  {
    name: "Monthly SEO Reporting Dashboard",
    description: "Automated monthly reports with keyword rankings, traffic, and conversion data.",
    type: "Tool",
    status: "planned",
  },
];

export function getDeliverablesByStatus(status: DeliverableStatus): Deliverable[] {
  return deliverables.filter((d) => d.status === status);
}

export const deliverableStats = {
  delivered: deliverables.filter((d) => d.status === "delivered").length,
  inProgress: deliverables.filter((d) => d.status === "in-progress").length,
  planned: deliverables.filter((d) => d.status === "planned").length,
  total: deliverables.length,
};
