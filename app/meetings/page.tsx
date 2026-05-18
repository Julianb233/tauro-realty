"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import GlassCard from "@/components/GlassCard";
import PageHeader from "@/components/PageHeader";
import ScrollReveal from "@/components/ScrollReveal";
import {
  meetings,
  meetingStats,
  getAllDecisions,
  type Meeting,
  type MeetingDecision,
  type MeetingTakeaway,
} from "@/data/meetings";

const decisionStatusColors: Record<string, string> = {
  implemented: "bg-emerald-50 text-emerald-700 border-emerald-200",
  "in-progress": "bg-blue-50 text-blue-700 border-blue-200",
  pending: "bg-amber-50 text-amber-700 border-amber-200",
  deferred: "bg-gray-50 text-gray-600 border-gray-200",
};

const takeawayColors: Record<string, string> = {
  insight: "bg-blue-50 text-blue-700",
  requirement: "bg-purple-50 text-purple-700",
  concern: "bg-rose-50 text-rose-700",
  priority: "bg-amber-50 text-amber-700",
  feedback: "bg-emerald-50 text-emerald-700",
};

const actionOwnerColors: Record<string, string> = {
  agency: "bg-blue-50 text-blue-700",
  client: "bg-amber-50 text-amber-700",
};

const actionStatusDots: Record<string, string> = {
  done: "bg-emerald-500",
  "in-progress": "bg-blue-500",
  pending: "bg-amber-500",
};

type ViewMode = "meetings" | "decisions";

function MeetingCard({ meeting }: { meeting: Meeting }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <ScrollReveal>
      <div className="card overflow-hidden">
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full text-left p-5 md:p-6"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <Link href={`/meetings/${meeting.id}`} className="text-sm font-semibold text-black hover:text-blue-600 transition-colors">
                  {meeting.title}
                </Link>
                {meeting.transcriptUrl && (
                  <a
                    href={meeting.transcriptUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-[10px] text-blue-600 hover:text-blue-500 underline"
                  >
                    Transcript
                  </a>
                )}
                {meeting.recordingUrl && (
                  <a
                    href={meeting.recordingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-[10px] text-blue-600 hover:text-blue-500 underline"
                  >
                    Recording
                  </a>
                )}
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-600">
                <span>{new Date(meeting.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                <span>{meeting.duration}</span>
                <span>{meeting.attendees.join(", ")}</span>
              </div>
              <p className="text-xs text-gray-600 mt-2">{meeting.summary}</p>
            </div>
            <svg
              className={`w-4 h-4 text-gray-600 flex-shrink-0 transition-transform ${expanded ? "rotate-180" : ""}`}
              fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </div>
        </button>

        {expanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="px-5 md:px-6 pb-5 md:pb-6 space-y-4 border-t border-gray-100 pt-4"
          >
            {/* Takeaways */}
            {meeting.takeaways.length > 0 && (
              <div>
                <h4 className="text-xs font-semibold text-black mb-2">Key Takeaways</h4>
                <div className="space-y-1.5">
                  {meeting.takeaways.map((t, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-medium mt-0.5 ${takeawayColors[t.category]}`}>
                        {t.category}
                      </span>
                      <p className="text-xs text-gray-600">{t.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Decisions */}
            {meeting.decisions.length > 0 && (
              <div>
                <h4 className="text-xs font-semibold text-black mb-2">Decisions Made</h4>
                <div className="space-y-1.5">
                  {meeting.decisions.map((d, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-medium border mt-0.5 ${decisionStatusColors[d.status]}`}>
                        {d.status}
                      </span>
                      <div>
                        <p className="text-xs text-gray-700">{d.decision}</p>
                        {d.linkedDeliverable && (
                          <p className="text-[10px] text-blue-600 mt-0.5">Linked: {d.linkedDeliverable}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Items */}
            {meeting.actionItems.length > 0 && (
              <div>
                <h4 className="text-xs font-semibold text-black mb-2">Action Items</h4>
                <div className="space-y-1.5">
                  {meeting.actionItems.map((a, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${actionStatusDots[a.status]}`} />
                      <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-medium ${actionOwnerColors[a.owner]}`}>
                        {a.owner}
                      </span>
                      <p className={`text-xs ${a.status === "done" ? "text-gray-600 line-through" : "text-gray-700"}`}>
                        {a.item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </ScrollReveal>
  );
}

export default function MeetingsPage() {
  const [view, setView] = useState<ViewMode>("meetings");
  const allDecisions = getAllDecisions();

  return (
    <div className="space-y-6">
      <PageHeader
        badge={`${meetingStats.total} meetings`}
        title="Meetings & Decisions"
        subtitle="Meeting notes, key decisions, and action items from our conversations."
      />

      {/* Stats */}
      <ScrollReveal>
        <GlassCard>
          <div className="flex items-center gap-6 text-sm flex-wrap">
            <div>
              <span className="text-2xl font-bold text-black">{meetingStats.total}</span>
              <span className="text-gray-700 ml-1.5">meetings</span>
            </div>
            <div className="h-6 w-px bg-gray-200 hidden sm:block" />
            <div>
              <span className="text-2xl font-bold text-emerald-600">{meetingStats.implementedDecisions}</span>
              <span className="text-gray-700 ml-1.5">decisions implemented</span>
            </div>
            <div className="h-6 w-px bg-gray-200 hidden sm:block" />
            <div>
              <span className="text-2xl font-bold text-blue-600">{meetingStats.totalDecisions - meetingStats.implementedDecisions}</span>
              <span className="text-gray-700 ml-1.5">in progress</span>
            </div>
            {meetingStats.pendingActions > 0 && (
              <>
                <div className="h-6 w-px bg-gray-200 hidden sm:block" />
                <div>
                  <span className="text-2xl font-bold text-amber-600">{meetingStats.pendingActions}</span>
                  <span className="text-gray-700 ml-1.5">pending actions</span>
                </div>
              </>
            )}
          </div>
        </GlassCard>
      </ScrollReveal>

      {/* View Toggle */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setView("meetings")}
          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors min-h-[36px] ${view === "meetings" ? "bg-black text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
        >
          By Meeting
        </button>
        <button
          onClick={() => setView("decisions")}
          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors min-h-[36px] ${view === "decisions" ? "bg-black text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
        >
          All Decisions
        </button>
      </div>

      {/* Meetings View */}
      {view === "meetings" && (
        <div className="space-y-3">
          {meetings.map((meeting) => (
            <MeetingCard key={meeting.id} meeting={meeting} />
          ))}
        </div>
      )}

      {/* Decisions View */}
      {view === "decisions" && (
        <ScrollReveal>
          <div className="card p-5 md:p-6">
            <h2 className="text-sm font-semibold text-black mb-4">All Decisions ({allDecisions.length})</h2>
            <div className="space-y-3">
              {allDecisions.map((d, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-gray-50">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border mt-0.5 ${decisionStatusColors[d.status]}`}>
                    {d.status}
                  </span>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-black">{d.decision}</p>
                    <p className="text-[10px] text-gray-600 mt-0.5">
                      From: {d.meetingTitle} — {new Date(d.meetingDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </p>
                    {d.linkedDeliverable && (
                      <p className="text-[10px] text-blue-600 mt-0.5">Delivered: {d.linkedDeliverable}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      )}
    </div>
  );
}
