"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import GlassCard from "@/components/GlassCard";
import PageHeader from "@/components/PageHeader";
import ReviewActions from "@/components/ReviewActions";
import { actionItems } from "@/data/action-items";

const priorityColors: Record<string, string> = {
  high: "bg-red-100 text-red-700",
  medium: "bg-amber-100 text-amber-700",
  low: "bg-blue-100 text-blue-700",
};

const statusColors: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700",
  submitted: "bg-blue-100 text-blue-700",
  completed: "bg-emerald-100 text-emerald-700",
};

export default function ActionItemDetailPage() {
  const params = useParams();
  const item = actionItems.find((a) => a.id === params.id);

  if (!item) {
    return (
      <div className="space-y-6">
        <PageHeader badge="Not Found" title="Action item not found" subtitle="This item doesn't exist." />
        <Link href="/action-items" className="text-sm text-blue-500 hover:underline">&larr; Back to Action Items</Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Link href="/action-items" className="inline-flex items-center gap-1 text-sm text-gray-700 hover:text-black transition-colors">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
        Back to Action Items
      </Link>

      <PageHeader
        badge={`${item.priority} priority`}
        title={item.title}
        subtitle={item.description}
      />

      {/* Status & Due Date */}
      <GlassCard>
        <div className="flex flex-wrap gap-4 items-center">
          <div>
            <p className="text-xs text-gray-700 mb-1">Status</p>
            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${statusColors[item.status]}`}>
              {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
            </span>
          </div>
          <div>
            <p className="text-xs text-gray-700 mb-1">Priority</p>
            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${priorityColors[item.priority]}`}>
              {item.priority.charAt(0).toUpperCase() + item.priority.slice(1)}
            </span>
          </div>
          <div>
            <p className="text-xs text-gray-700 mb-1">Due Date</p>
            <p className="text-sm font-medium text-gray-900">{item.dueDate}</p>
          </div>
        </div>
      </GlassCard>

      {/* Step-by-step Instructions */}
      <GlassCard>
        <h3 className="text-sm font-semibold text-black mb-4">Step-by-Step Instructions</h3>
        <ol className="space-y-3">
          {item.instructions.map((step, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold">
                {i + 1}
              </span>
              <p className="text-sm text-gray-700 pt-0.5">{step}</p>
            </li>
          ))}
        </ol>
      </GlassCard>

      {/* Review / Respond */}
      {item.status === "pending" && (
        <GlassCard>
          <h3 className="text-sm font-semibold text-black">Respond</h3>
          <p className="text-xs text-gray-700 mt-1">Mark as done, let us know if you have questions, or leave a comment.</p>
          <ReviewActions itemId={item.id} itemType="action-item" currentStatus={item.status} />
        </GlassCard>
      )}
    </div>
  );
}
