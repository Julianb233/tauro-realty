"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import GlassCard from "@/components/GlassCard";
import PageHeader from "@/components/PageHeader";
import ReviewActions from "@/components/ReviewActions";
import { deliverables } from "@/data/deliverables";

const typeBadgeColors: Record<string, string> = {
  Website: "bg-blue-50 text-blue-700 border-blue-200",
  Tool: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Infrastructure: "bg-purple-50 text-purple-700 border-purple-200",
  Strategy: "bg-amber-50 text-amber-700 border-amber-200",
  Feature: "bg-cyan-50 text-cyan-700 border-cyan-200",
  Integration: "bg-pink-50 text-pink-700 border-pink-200",
  Design: "bg-violet-50 text-violet-700 border-violet-200",
  Document: "bg-gray-50 text-gray-700 border-gray-200",
  Workflow: "bg-orange-50 text-orange-700 border-orange-200",
  Agent: "bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200",
};

const statusColors: Record<string, string> = {
  delivered: "bg-emerald-100 text-emerald-700",
  "in-progress": "bg-blue-100 text-blue-700",
  planned: "bg-gray-100 text-gray-600",
};

const approvalColors: Record<string, string> = {
  "pending-review": "bg-amber-100 text-amber-700",
  approved: "bg-emerald-100 text-emerald-700",
  "changes-requested": "bg-red-100 text-red-700",
  none: "bg-gray-100 text-gray-700",
};

export default function DeliverableDetailPage() {
  const params = useParams();
  const index = parseInt(params.id as string, 10);
  const item = deliverables[index];

  if (!item) {
    return (
      <div className="space-y-6">
        <PageHeader badge="Not Found" title="Deliverable not found" subtitle="This item doesn't exist." />
        <Link href="/deliverables" className="text-sm text-blue-500 hover:underline">&larr; Back to Deliverables</Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Link href="/deliverables" className="inline-flex items-center gap-1 text-sm text-gray-700 hover:text-black transition-colors">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
        Back to Deliverables
      </Link>

      <PageHeader
        badge={item.type}
        title={item.name}
        subtitle={item.description}
      />

      {/* Status & Metadata */}
      <GlassCard>
        <div className="flex flex-wrap gap-3 mb-4">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${statusColors[item.status]}`}>
            {item.status === "in-progress" ? "In Progress" : item.status.charAt(0).toUpperCase() + item.status.slice(1)}
          </span>
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${typeBadgeColors[item.type] || "bg-gray-50 text-gray-700 border-gray-200"}`}>
            {item.type}
          </span>
          {item.approval && item.approval !== "none" && (
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${approvalColors[item.approval]}`}>
              {item.approval === "pending-review" ? "Pending Review" : item.approval === "changes-requested" ? "Changes Requested" : "Approved"}
            </span>
          )}
        </div>

        {item.deliveredDate && (
          <p className="text-xs text-gray-700">Delivered: {item.deliveredDate}</p>
        )}

        {item.url && (
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 mt-3 px-4 py-2 rounded-lg bg-blue-500 text-white text-sm font-medium hover:bg-blue-600 transition-colors"
          >
            View Live
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
          </a>
        )}
      </GlassCard>

      {/* Assets */}
      {item.assets && item.assets.length > 0 && (
        <GlassCard>
          <h3 className="text-sm font-semibold text-black mb-3">Assets & Links</h3>
          <div className="space-y-2">
            {item.assets.map((asset, i) => (
              <a
                key={i}
                href={asset.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <span className="text-xs font-medium text-gray-700 uppercase">{asset.type}</span>
                <span className="text-sm text-blue-600 font-medium">{asset.label}</span>
              </a>
            ))}
          </div>
        </GlassCard>
      )}

      {/* Existing Comments */}
      {item.comments && item.comments.length > 0 && (
        <GlassCard>
          <h3 className="text-sm font-semibold text-black mb-3">Comments & Feedback</h3>
          <div className="space-y-3">
            {item.comments.map((c, i) => (
              <div key={i} className={`p-3 rounded-lg border ${
                c.type === "approval" ? "bg-emerald-50 border-emerald-200" :
                c.type === "change-request" ? "bg-red-50 border-red-200" :
                c.type === "suggestion" ? "bg-blue-50 border-blue-200" :
                "bg-gray-50 border-gray-200"
              }`}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-semibold text-gray-700">{c.author}</span>
                  <span className="text-xs text-gray-600">{c.date}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                    c.type === "approval" ? "bg-emerald-100 text-emerald-700" :
                    c.type === "change-request" ? "bg-red-100 text-red-700" :
                    c.type === "suggestion" ? "bg-blue-100 text-blue-700" :
                    "bg-gray-100 text-gray-600"
                  }`}>
                    {c.type}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{c.text}</p>
              </div>
            ))}
          </div>
        </GlassCard>
      )}

      {/* Review Actions */}
      <GlassCard>
        <h3 className="text-sm font-semibold text-black">Your Review</h3>
        <p className="text-xs text-gray-700 mt-1">Approve this deliverable, request changes, or leave feedback.</p>
        <ReviewActions itemId={`deliverable-${index}`} itemType="deliverable" currentStatus={item.approval} />
      </GlassCard>
    </div>
  );
}
