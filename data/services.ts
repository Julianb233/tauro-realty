// ============================================================
// SERVICES DATA — AI Acrobatics service catalog per client
// Active services = what client is paying for
// Available services = what we can upsell
// ============================================================

// Only show services relevant to what the client discussed with Julian.
// "active" = currently paying for, "discussed" = showed interest / on roadmap
export type ServiceStatus = "active" | "discussed";

export type ServiceSlug =
  | "website"
  | "seo"
  | "content"
  | "crm"
  | "ai-agents"
  | "social-media"
  | "email-marketing"
  | "paid-ads"
  | "branding"
  | "consulting";

export interface ServiceFeature {
  label: string;
  included: boolean;
}

export interface Service {
  slug: ServiceSlug;
  name: string;
  description: string;
  status: ServiceStatus;
  icon: string; // SVG path for heroicons
  color: string; // Tailwind color class prefix (e.g., "blue", "emerald")
  features: ServiceFeature[];
  /** What the client is getting under this service — shown when active */
  scope?: string;
  /** Link to detailed service info or proposal */
  detailUrl?: string;
}

export const services: Service[] = [
  // REPLACE: Set status to "active" for services this client is paying for

  {
    slug: "website",
    name: "Website Design & Development",
    description: "Custom-built, conversion-optimized websites on Next.js with blazing-fast performance.",
    status: "active",
    icon: "M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418",
    color: "blue",
    features: [
      { label: "Custom responsive design", included: true },
      { label: "Mobile-first development", included: true },
      { label: "SEO-optimized architecture", included: true },
      { label: "Contact forms & CTAs", included: true },
      { label: "Vercel hosting & CI/CD", included: true },
      { label: "Performance optimization (95+ PageSpeed)", included: true },
    ],
    scope: "Full website build — Homepage, About, Services, Contact, FAQ, and Blog.",
  },
  {
    slug: "seo",
    name: "SEO & Search Visibility",
    description: "Technical SEO, keyword strategy, link building, and monthly reporting to dominate local search.",
    status: "active",
    icon: "M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6",
    color: "emerald",
    features: [
      { label: "Technical SEO audit & fixes", included: true },
      { label: "Keyword research & tracking", included: true },
      { label: "Google Business Profile optimization", included: true },
      { label: "Monthly SEO performance reports", included: true },
      { label: "Local citation building", included: true },
      { label: "Link building campaigns", included: false },
    ],
    scope: "Foundation SEO + local optimization. 45 keywords tracked, monthly reports.",
  },
  {
    slug: "content",
    name: "Content Marketing",
    description: "Strategic content creation — blog articles, ebooks, case studies, and thought leadership.",
    status: "active",
    icon: "M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z",
    color: "amber",
    features: [
      { label: "SEO-optimized blog articles", included: true },
      { label: "Content calendar & strategy", included: true },
      { label: "Competitor content analysis", included: true },
      { label: "Internal linking strategy", included: true },
      { label: "Ebook & lead magnet creation", included: false },
      { label: "Video content scripts", included: false },
    ],
    scope: "4 articles/month with keyword targeting and editorial calendar.",
  },
  // REPLACE: Only add services that the client discussed with Julian or is paying for.
  // Do NOT add generic upsell services. If the client didn't discuss it, don't show it.
];

// --- Helper functions ---

export function getActiveServices(): Service[] {
  return services.filter((s) => s.status === "active");
}

export function getDiscussedServices(): Service[] {
  return services.filter((s) => s.status === "discussed");
}

export function getServiceBySlug(slug: ServiceSlug): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export const serviceStats = {
  active: services.filter((s) => s.status === "active").length,
  discussed: services.filter((s) => s.status === "discussed").length,
  total: services.length,
};
