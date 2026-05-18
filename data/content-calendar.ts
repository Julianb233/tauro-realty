import type { ServiceSlug } from "./services";

export type ContentType = "blog-article" | "social-post" | "email-campaign" | "video" | "infographic" | "case-study" | "ebook" | "press-release";
export type ContentStatus = "draft" | "pending-approval" | "approved" | "scheduled" | "published" | "rejected";
export type ContentPlatform = "website" | "instagram" | "facebook" | "linkedin" | "twitter" | "email" | "youtube" | "tiktok" | "google-business";

export interface ContentItem {
  id: string;
  title: string;
  description: string;
  type: ContentType;
  platform: ContentPlatform;
  service: ServiceSlug;
  status: ContentStatus;
  scheduledDate: string;
  publishedDate?: string;
  previewUrl?: string;
  liveUrl?: string;
  targetKeywords?: string[];
  clientNote?: string;
  author: string;
}

// LYL Realty Group content calendar is intentionally empty at this stage.
// Per the 5/18 content handoff call, content priority is:
//   1. Refresh the agent roster (Noah delivering)
//   2. Build the first property page for 1001 West Allen Lane (Dayhna delivering)
//   3. Stand up the reusable property page + brochure engine
// Broader content marketing (blog articles, social, email) is deferred until those land.
export const contentCalendar: ContentItem[] = [];

export function getContentByStatus(status: ContentStatus): ContentItem[] {
  return contentCalendar.filter((c) => c.status === status);
}

export function getContentByMonth(year: number, month: number): ContentItem[] {
  return contentCalendar.filter((c) => {
    const d = new Date(c.scheduledDate);
    return d.getFullYear() === year && d.getMonth() === month - 1;
  });
}

export function getContentNeedingApproval(): ContentItem[] {
  return contentCalendar.filter((c) => c.status === "pending-approval");
}

export function getUpcomingContent(days: number = 30): ContentItem[] {
  const now = new Date();
  const cutoff = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);
  return contentCalendar
    .filter((c) => {
      const d = new Date(c.scheduledDate);
      return d >= now && d <= cutoff && c.status !== "published";
    })
    .sort((a, b) => new Date(a.scheduledDate).getTime() - new Date(b.scheduledDate).getTime());
}

export const calendarStats = {
  total: contentCalendar.length,
  published: contentCalendar.filter((c) => c.status === "published").length,
  scheduled: contentCalendar.filter((c) => c.status === "scheduled" || c.status === "approved").length,
  pendingApproval: contentCalendar.filter((c) => c.status === "pending-approval").length,
  drafts: contentCalendar.filter((c) => c.status === "draft").length,
};
