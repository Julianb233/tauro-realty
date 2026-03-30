// ============================================================
// CLIENT DATA — Replace these values for each new client
// Run: bash setup.sh <slug> "<name>" "<phone>" to auto-replace
// ============================================================

export const clientInfo = {
  // REPLACE: Client business name
  name: "Acme Corp",
  // REPLACE: URL-safe slug (lowercase, hyphens)
  slug: "acme-corp",
  contact: {
    // REPLACE: Primary contact first name
    name: "Alex",
    // REPLACE: Primary contact phone
    phone: "+15551234567",
  },
  // REPLACE: Client's website domain
  domain: "acme-corp.com",
  // REPLACE: Deployed portal URL (after Vercel deploy)
  portalDomain: "acme-corp-portal.vercel.app",
  agency: "AI Acrobatics",
  agencyContact: "julian@aiacrobatics.com",
};

export const stats = [
  // REPLACE: Key metrics relevant to this client's project
  { label: "Pages Built", value: "8", trend: "up" as const },
  { label: "Features Shipped", value: "5", trend: "up" as const },
  { label: "Phases Complete", value: "3/4", trend: "up" as const },
  { label: "Uptime", value: "99.9%", trend: "up" as const },
];

export const hubLinks = [
  // REPLACE: Links relevant to this client's project
  { label: "Live Website", url: "https://acme-corp.com", icon: "globe", description: "Production website" },
  { label: "Product Roadmap", url: "/progress", icon: "map", description: "Development phases and milestones" },
  { label: "Deliverables", url: "/deliverables", icon: "package", description: "Everything built and shipped" },
  { label: "Changelog", url: "/changelog", icon: "list", description: "Detailed update history" },
  { label: "Action Items", url: "/action-items", icon: "clipboard", description: "What we need from you" },
  { label: "Book a Call", url: "https://calendly.com/julian-aiacrobatics", icon: "phone", description: "Schedule with Julian" },
];

export const snapshot = {
  // REPLACE: Current month
  month: "March 2026",
  // REPLACE: Project health — "great" | "good" | "attention" | "blocked"
  health: "great" as const,
  // REPLACE: One-line summary of current status
  summary: "Phase 1 complete — website launched, SEO foundations in place, content pipeline active.",
  highlights: [
    // REPLACE: 4 key highlights for this month
    { label: "Completed", value: "3 phases", icon: "check" },
    { label: "Content", value: "12 pages published", icon: "document" },
    { label: "SEO", value: "45 keywords tracked", icon: "chart" },
    { label: "Performance", value: "95+ PageSpeed", icon: "lightning" },
  ],
  nextMonthFocus: [
    // REPLACE: 2-3 priorities for next month
    "Launch email marketing automation",
    "Publish 4 new blog articles targeting priority keywords",
    "Set up CRM lead tracking pipeline",
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
  // REPLACE: Real project activity entries (newest first)
  {
    date: "Mar 30",
    title: "Progress portal launched",
    type: "deploy",
    description: "Client-facing dashboard deployed with real-time project visibility, action items, and changelog.",
  },
  {
    date: "Mar 28",
    title: "Website deployed to production",
    type: "deploy",
    description: "Full website live on custom domain with SSL, analytics, and performance optimization.",
  },
  {
    date: "Mar 25",
    title: "SEO foundation configured",
    type: "infrastructure",
    description: "Meta tags, sitemap, robots.txt, structured data, and Google Search Console verified.",
  },
  {
    date: "Mar 22",
    title: "Content strategy finalized",
    type: "planning",
    description: "12-month content calendar with keyword targets, topic clusters, and publishing schedule.",
  },
  {
    date: "Mar 20",
    title: "Homepage and core pages built",
    type: "feature",
    description: "Homepage, About, Services, Contact, and FAQ pages designed and developed.",
  },
  {
    date: "Mar 18",
    title: "Brand identity and design system",
    type: "design",
    description: "Color palette, typography, component library, and responsive layouts established.",
  },
  {
    date: "Mar 15",
    title: "Project kickoff and requirements",
    type: "planning",
    description: "Discovery session complete. Requirements documented, timeline agreed, roadmap created.",
  },
  {
    date: "Mar 12",
    title: "Domain and hosting configured",
    type: "infrastructure",
    description: "Domain DNS pointed, Vercel project created, CI/CD pipeline connected to GitHub.",
  },
  {
    date: "Mar 10",
    title: "Competitive analysis delivered",
    type: "content",
    description: "Analysis of 8 competitors with SEO gaps, content opportunities, and positioning recommendations.",
  },
  {
    date: "Mar 8",
    title: "Initial wireframes approved",
    type: "design",
    description: "Mobile-first wireframes for all 8 core pages reviewed and approved by client.",
  },
  {
    date: "Mar 5",
    title: "Project setup and infrastructure",
    type: "infrastructure",
    description: "Next.js project initialized, Tailwind configured, deployment pipeline set up.",
  },
  {
    date: "Mar 3",
    title: "Market research complete",
    type: "content",
    description: "Industry analysis, target audience profiles, and keyword research delivered.",
  },
];
