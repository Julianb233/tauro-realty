"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import GlassCard from "@/components/GlassCard";
import PageHeader from "@/components/PageHeader";
import ReviewActions from "@/components/ReviewActions";
import { meetings } from "@/data/meetings";

const decisionStatusColors: Record<string, string> = {
  implemented: "bg-emerald-100 text-emerald-700",
  "in-progress": "bg-blue-100 text-blue-700",
  pending: "bg-amber-100 text-amber-700",
  deferred: "bg-gray-100 text-gray-600",
};

const takeawayColors: Record<string, string> = {
  insight: "bg-blue-50 border-blue-200",
  requirement: "bg-purple-50 border-purple-200",
  concern: "bg-red-50 border-red-200",
  priority: "bg-amber-50 border-amber-200",
  feedback: "bg-emerald-50 border-emerald-200",
};

export default function MeetingDetailPage() {
  const params = useParams();
  const meeting = meetings.find((m) => m.id === params.id);

  if (!meeting) {
    return (
      <div className="space-y-6">
        <PageHeader badge="Not Found" title="Meeting not found" subtitle="This meeting doesn't exist." />
        <Link href="/meetings" className="text-sm text-blue-500 hover:underline">&larr; Back to Meetings</Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Link href="/meetings" className="inline-flex items-center gap-1 text-sm text-gray-700 hover:text-black transition-colors">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
        Back to Meetings
      </Link>

      <PageHeader
        badge={meeting.date}
        title={meeting.title}
        subtitle={`${meeting.duration} with ${meeting.attendees.join(", ")}`}
      />

      {/* Summary */}
      <GlassCard>
        <h3 className="text-sm font-semibold text-black mb-2">Summary</h3>
        <p className="text-sm text-gray-600 leading-relaxed">{meeting.summary}</p>

        <div className="flex gap-2 mt-4">
          {meeting.transcriptUrl && (
            <a href={meeting.transcriptUrl} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 text-gray-700 text-xs font-medium hover:bg-gray-200 transition-colors">
              View Transcript
            </a>
          )}
          {meeting.recordingUrl && (
            <a href={meeting.recordingUrl} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 text-gray-700 text-xs font-medium hover:bg-gray-200 transition-colors">
              Watch Recording
            </a>
          )}
        </div>
      </GlassCard>

      {/* Key Takeaways */}
      {meeting.takeaways.length > 0 && (
        <GlassCard>
          <h3 className="text-sm font-semibold text-black mb-3">Key Takeaways</h3>
          <div className="space-y-2">
            {meeting.takeaways.map((t, i) => (
              <div key={i} className={`p-3 rounded-lg border ${takeawayColors[t.category]}`}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-semibold uppercase text-gray-700">{t.category}</span>
                </div>
                <p className="text-sm text-gray-700">{t.text}</p>
              </div>
            ))}
          </div>
        </GlassCard>
      )}

      {/* Decisions */}
      {meeting.decisions.length > 0 && (
        <GlassCard>
          <h3 className="text-sm font-semibold text-black mb-3">Decisions Made</h3>
          <div className="space-y-2">
            {meeting.decisions.map((d, i) => (
              <div key={i} className="flex items-start justify-between p-3 rounded-lg bg-gray-50">
                <p className="text-sm text-gray-700 flex-1">{d.decision}</p>
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ml-3 flex-shrink-0 ${decisionStatusColors[d.status]}`}>
                  {d.status}
                </span>
              </div>
            ))}
          </div>

          {/* Review decisions */}
          {meeting.decisions.some((d) => d.status === "pending") && (
            <div className="mt-4">
              <p className="text-xs text-gray-700">Have feedback on any of these decisions?</p>
              <ReviewActions itemId={meeting.id} itemType="meeting-decision" />
            </div>
          )}
        </GlassCard>
      )}

      {/* Action Items from Meeting */}
      {meeting.actionItems.length > 0 && (
        <GlassCard>
          <h3 className="text-sm font-semibold text-black mb-3">Action Items</h3>
          <div className="space-y-2">
            {meeting.actionItems.map((ai, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                <div className="flex items-center gap-3">
                  {ai.status === "done" ? (
                    <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  ) : (
                    <div className={`w-4 h-4 rounded-full border-2 ${ai.status === "in-progress" ? "border-blue-400" : "border-gray-300"}`} />
                  )}
                  <p className={`text-sm ${ai.status === "done" ? "text-gray-600 line-through" : "text-gray-700"}`}>{ai.item}</p>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                  ai.owner === "agency" ? "bg-blue-100 text-blue-700" : "bg-amber-100 text-amber-700"
                }`}>
                  {ai.owner === "agency" ? "AI Acrobatics" : "You"}
                </span>
              </div>
            ))}
          </div>
        </GlassCard>
      )}
    </div>
  );
}
