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
  // REPLACE: Define milestones and phases for this client's project
  {
    id: "m1",
    name: "M1 -- Foundation",
    status: "active",
    description: "Website launch, brand identity, SEO foundation, and initial content.",
    timeframe: "Month 1-2",
    phases: [
      {
        id: 1,
        name: "Discovery & Planning",
        status: "completed",
        description: "Requirements gathering, competitive analysis, and project roadmap",
        deliverables: [
          { label: "Discovery questionnaire and kickoff call", done: true },
          { label: "Competitive analysis (8 competitors)", done: true },
          { label: "Market research and audience personas", done: true },
          { label: "Project roadmap and timeline", done: true },
        ],
        dateRange: "Mar 3-8",
      },
      {
        id: 2,
        name: "Design & Branding",
        status: "completed",
        description: "Visual identity, wireframes, and component library",
        deliverables: [
          { label: "Brand color palette and typography", done: true },
          { label: "Mobile-first wireframes for all pages", done: true },
          { label: "Reusable component library", done: true },
          { label: "Client design review and approval", done: true },
        ],
        dateRange: "Mar 8-18",
      },
      {
        id: 3,
        name: "Website Development",
        status: "completed",
        description: "Build and deploy all core website pages",
        deliverables: [
          { label: "Homepage with hero, services, testimonials, CTA", done: true },
          { label: "About, Services, Contact, FAQ pages", done: true },
          { label: "Responsive layout (mobile, tablet, desktop)", done: true },
          { label: "Production deployment on custom domain", done: true },
        ],
        dateRange: "Mar 18-28",
      },
      {
        id: 4,
        name: "SEO & Analytics Setup",
        status: "active",
        description: "Technical SEO, tracking, and search visibility",
        deliverables: [
          { label: "Meta tags and structured data", done: true },
          { label: "XML sitemap and robots.txt", done: true },
          { label: "Google Search Console verification", done: true },
          { label: "Google Analytics 4 configuration", done: true },
          { label: "Initial keyword tracking setup", done: false },
        ],
        dateRange: "Mar 25-Apr 5",
      },
    ],
  },
  {
    id: "m2",
    name: "M2 -- Growth",
    status: "upcoming",
    description: "Content marketing, email automation, CRM integration, and lead generation.",
    timeframe: "Month 3-4",
    phases: [
      {
        id: 5,
        name: "Blog & Content Pipeline",
        status: "upcoming",
        description: "Blog section, article templates, and first batch of SEO content",
        deliverables: [
          { label: "Blog index page and article template", done: false },
          { label: "4 SEO-optimized articles published", done: false },
          { label: "Internal linking strategy implemented", done: false },
          { label: "Content review workflow established", done: false },
        ],
        dateRange: "Month 3",
      },
      {
        id: 6,
        name: "Email Marketing & Automation",
        status: "upcoming",
        description: "Newsletter signup, welcome sequence, and nurture campaigns",
        deliverables: [
          { label: "Email signup forms on website", done: false },
          { label: "Welcome email sequence (5 emails)", done: false },
          { label: "Monthly newsletter template", done: false },
          { label: "Lead magnet creation and delivery", done: false },
        ],
        dateRange: "Month 3",
      },
      {
        id: 7,
        name: "CRM & Lead Tracking",
        status: "upcoming",
        description: "CRM integration, lead scoring, and follow-up automation",
        deliverables: [
          { label: "CRM platform configured", done: false },
          { label: "Contact form to CRM pipeline", done: false },
          { label: "Lead scoring rules defined", done: false },
          { label: "Automated follow-up sequences", done: false },
        ],
        dateRange: "Month 4",
      },
    ],
  },
  {
    id: "m3",
    name: "M3 -- Scale",
    status: "upcoming",
    description: "Paid advertising, advanced SEO, conversion optimization, and reporting.",
    timeframe: "Month 5-6",
    phases: [
      {
        id: 8,
        name: "Paid Advertising",
        status: "upcoming",
        description: "Google Ads, landing pages, and conversion tracking",
        deliverables: [
          { label: "3 conversion-optimized landing pages", done: false },
          { label: "Google Ads campaign setup", done: false },
          { label: "Conversion tracking and attribution", done: false },
          { label: "A/B testing framework", done: false },
        ],
        dateRange: "Month 5",
      },
      {
        id: 9,
        name: "Advanced SEO & Reporting",
        status: "upcoming",
        description: "Link building, local SEO, and automated reporting",
        deliverables: [
          { label: "Google Business Profile optimization", done: false },
          { label: "Local citation building (20+ directories)", done: false },
          { label: "Monthly SEO performance reports", done: false },
          { label: "Quarterly strategy review and adjustment", done: false },
        ],
        dateRange: "Month 6",
      },
    ],
  },
];

export const milestoneProgress = {
  // REPLACE: Update as phases complete
  currentMilestone: "M1 -- Foundation",
  totalPhases: 4,
  completedPhases: 3,
  percentComplete: 75,
};

export function getAllPhases(): Phase[] {
  return milestones.flatMap((m) => m.phases);
}
