"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import GlassCard from "@/components/GlassCard";
import PageHeader from "@/components/PageHeader";
import ReviewActions from "@/components/ReviewActions";
import { contentCalendar } from "@/data/content-calendar";

const statusColors: Record<string, string> = {
  draft: "bg-gray-100 text-gray-600",
  "pending-approval": "bg-amber-100 text-amber-700",
  approved: "bg-emerald-100 text-emerald-700",
  scheduled: "bg-blue-100 text-blue-700",
  published: "bg-emerald-100 text-emerald-700",
  rejected: "bg-red-100 text-red-700",
};

const typeLabels: Record<string, string> = {
  "blog-article": "Blog Article",
  "social-post": "Social Post",
  "email-campaign": "Email Campaign",
  video: "Video",
  infographic: "Infographic",
  "case-study": "Case Study",
  ebook: "Ebook",
  "press-release": "Press Release",
};

export default function ContentDetailPage() {
  const params = useParams();
  const item = contentCalendar.find((c) => c.id === params.id);

  if (!item) {
    return (
      <div className="space-y-6">
        <PageHeader badge="Not Found" title="Content not found" subtitle="This item doesn't exist." />
        <Link href="/calendar" className="text-sm text-blue-500 hover:underline">&larr; Back to Calendar</Link>
      </div>
    );
  }

  const needsReview = item.status === "pending-approval" || item.status === "draft";

  return (
    <div className="space-y-6">
      <Link href="/calendar" className="inline-flex items-center gap-1 text-sm text-gray-700 hover:text-black transition-colors">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
        Back to Calendar
      </Link>

      <PageHeader
        badge={typeLabels[item.type] || item.type}
        title={item.title}
        subtitle={item.description}
      />

      {/* Metadata */}
      <GlassCard>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-xs text-gray-700">Status</p>
            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold mt-1 ${statusColors[item.status]}`}>
              {item.status.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
            </span>
          </div>
          <div>
            <p className="text-xs text-gray-700">Platform</p>
            <p className="text-sm font-medium text-gray-900 mt-1 capitalize">{item.platform.replace("-", " ")}</p>
          </div>
          <div>
            <p className="text-xs text-gray-700">Scheduled</p>
            <p className="text-sm font-medium text-gray-900 mt-1">{item.scheduledDate}</p>
          </div>
          <div>
            <p className="text-xs text-gray-700">Author</p>
            <p className="text-sm font-medium text-gray-900 mt-1">{item.author}</p>
          </div>
        </div>
      </GlassCard>

      {/* Keywords */}
      {item.targetKeywords && item.targetKeywords.length > 0 && (
        <GlassCard>
          <h3 className="text-sm font-semibold text-black mb-2">Target Keywords</h3>
          <div className="flex flex-wrap gap-2">
            {item.targetKeywords.map((kw) => (
              <span key={kw} className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 text-xs font-medium border border-blue-200">
                {kw}
              </span>
            ))}
          </div>
        </GlassCard>
      )}

      {/* Preview / Live Links */}
      <GlassCard>
        <h3 className="text-sm font-semibold text-black mb-3">Links</h3>
        <div className="space-y-2">
          {item.previewUrl && (
            <a href={item.previewUrl} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
              <span className="text-xs font-medium text-gray-700">PREVIEW</span>
              <span className="text-sm text-blue-600 font-medium">View Draft</span>
            </a>
          )}
          {item.liveUrl && (
            <a href={item.liveUrl} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 p-3 rounded-lg bg-emerald-50 hover:bg-emerald-100 transition-colors">
              <span className="text-xs font-medium text-emerald-600">LIVE</span>
              <span className="text-sm text-emerald-700 font-medium">View Published</span>
            </a>
          )}
          {!item.previewUrl && !item.liveUrl && (
            <p className="text-sm text-gray-600">No links available yet.</p>
          )}
        </div>
      </GlassCard>

      {/* Client Note */}
      {item.clientNote && (
        <GlassCard>
          <h3 className="text-sm font-semibold text-black mb-2">Your Previous Feedback</h3>
          <p className="text-sm text-gray-600 p-3 bg-amber-50 rounded-lg border border-amber-200">{item.clientNote}</p>
        </GlassCard>
      )}

      {/* Review Actions */}
      {needsReview && (
        <GlassCard>
          <h3 className="text-sm font-semibold text-black">Your Review</h3>
          <p className="text-xs text-gray-700 mt-1">Approve this content for publishing, request changes, or leave feedback.</p>
          <ReviewActions itemId={item.id} itemType="content" currentStatus={item.status} />
        </GlassCard>
      )}
    </div>
  );
}
