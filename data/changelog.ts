export type ChangelogCategory = "feature" | "content" | "seo" | "fix" | "infrastructure" | "design";

export interface ChangelogEntry {
  date: string;
  title: string;
  description: string;
  category: ChangelogCategory;
  items: string[];
}

export const changelog: ChangelogEntry[] = [
  // REPLACE: Add real changelog entries as work is completed (newest first)
  // Agents: add a new entry at the TOP of this array after each work session
  {
    date: "2026-03-30",
    title: "Progress Portal Launched",
    description: "Client-facing dashboard deployed with real-time project visibility.",
    category: "feature",
    items: [
      "Built 5-tab portal: Home, Progress, Output, Activity, More",
      "Real-time milestone tracking with phase-level detail",
      "Action items with priority badges and due dates",
      "Dark glass-card UI with scroll-reveal animations",
      "Mobile-first responsive layout (375px to 1440px)",
    ],
  },
  {
    date: "2026-03-28",
    title: "Website Deployed to Production",
    description: "Full website live on custom domain with performance optimization.",
    category: "infrastructure",
    items: [
      "Vercel production deployment with custom domain",
      "SSL certificate configured and verified",
      "Google Analytics and Search Console connected",
      "PageSpeed score: 95+ on mobile and desktop",
      "Image optimization pipeline with WebP conversion",
    ],
  },
  {
    date: "2026-03-25",
    title: "SEO Foundation Complete",
    description: "Technical SEO infrastructure configured for search visibility.",
    category: "seo",
    items: [
      "Meta titles and descriptions for all pages",
      "XML sitemap generated and submitted to Google",
      "Robots.txt configured with proper directives",
      "Structured data (JSON-LD) for organization and local business",
      "Open Graph and Twitter Card meta tags",
    ],
  },
  {
    date: "2026-03-22",
    title: "Content Strategy Delivered",
    description: "12-month content calendar with keyword targets and topic clusters.",
    category: "content",
    items: [
      "Keyword research: 45 target keywords identified",
      "Topic cluster architecture with pillar and supporting content",
      "Monthly publishing schedule with seasonal adjustments",
      "Competitor content gap analysis completed",
    ],
  },
  {
    date: "2026-03-20",
    title: "Core Pages Built",
    description: "Homepage and essential pages designed, developed, and deployed.",
    category: "feature",
    items: [
      "Homepage with hero, services overview, testimonials, and CTA sections",
      "About page with team bios and company story",
      "Services page with detailed service cards",
      "Contact page with form and embedded map",
      "FAQ page with expandable accordion sections",
    ],
  },
  {
    date: "2026-03-18",
    title: "Design System Established",
    description: "Brand identity translated into a reusable component library.",
    category: "design",
    items: [
      "Color palette with primary, secondary, and accent colors",
      "Typography scale with responsive font sizes",
      "Component library: buttons, cards, forms, navigation",
      "Responsive grid system with mobile-first breakpoints",
    ],
  },
  {
    date: "2026-03-15",
    title: "Project Kickoff Complete",
    description: "Discovery session, requirements, and initial roadmap delivered.",
    category: "content",
    items: [
      "Discovery questionnaire completed and analyzed",
      "Business goals and success metrics defined",
      "Technical requirements documented",
      "6-month development roadmap created",
    ],
  },
  {
    date: "2026-03-12",
    title: "Infrastructure Setup",
    description: "Development environment and deployment pipeline configured.",
    category: "infrastructure",
    items: [
      "Next.js 14 project initialized with App Router",
      "Tailwind CSS configured with custom theme",
      "Vercel deployment connected to GitHub repo",
      "Environment variables and secrets configured",
    ],
  },
  {
    date: "2026-03-10",
    title: "Competitive Analysis",
    description: "Deep dive into competitor websites, SEO, and positioning.",
    category: "content",
    items: [
      "8 direct competitors analyzed for design and UX patterns",
      "SEO gap analysis: keywords competitors rank for that we don't",
      "Content audit: top-performing competitor content identified",
      "Positioning recommendations with differentiation strategy",
    ],
  },
  {
    date: "2026-03-08",
    title: "Wireframes Approved",
    description: "Mobile-first wireframes for all core pages reviewed and signed off.",
    category: "design",
    items: [
      "8 page wireframes designed in Figma",
      "Mobile, tablet, and desktop breakpoints covered",
      "User flow diagrams for key conversion paths",
      "Client feedback incorporated into final designs",
    ],
  },
  {
    date: "2026-03-05",
    title: "Market Research Delivered",
    description: "Industry landscape, audience profiles, and opportunity analysis.",
    category: "content",
    items: [
      "Industry trends and market size analysis",
      "3 detailed target audience personas created",
      "Keyword opportunity matrix with search volume and difficulty",
      "Content format recommendations based on audience preferences",
    ],
  },
];

export const changelogStats = {
  totalEntries: changelog.length,
  featuresShipped: changelog.filter((e) => e.category === "feature").length,
  infrastructureUpdates: changelog.filter((e) => e.category === "infrastructure").length,
  contentDelivered: changelog.filter((e) => e.category === "content").length,
};
