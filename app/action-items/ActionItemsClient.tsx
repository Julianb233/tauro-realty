"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import GlassCard from "@/components/GlassCard";
import PageHeader from "@/components/PageHeader";
import ScrollReveal from "@/components/ScrollReveal";
import type { ConvexActionItem } from "@/lib/portal-data";

// Map Convex priority → display config (keeps existing colour scheme)
const priorityConfig: Record<string, { color: string; label: string }> = {
  high: { color: "bg-rose-500/20 text-rose-400 border-rose-500/30", label: "High" },
  medium: { color: "bg-amber-500/20 text-amber-400 border-amber-500/30", label: "Medium" },
  low: { color: "bg-slate-500/20 text-slate-600 border-slate-500/30", label: "Low" },
};

const statusConfig: Record<string, { color: string; label: string }> = {
  pending: { color: "bg-amber-500/20 text-amber-400 border-amber-500/30", label: "Pending" },
  submitted: { color: "bg-blue-500/20 text-blue-400 border-blue-500/30", label: "Submitted" },
  overdue: { color: "bg-rose-500/20 text-rose-400 border-rose-500/30", label: "Overdue" },
  approved: { color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30", label: "Completed" },
  completed: { color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30", label: "Completed" },
};

interface Props {
  items: ConvexActionItem[];
}

export default function ActionItemsClient({ items }: Props) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const pendingCount = items.filter((i) => i.status === "pending" || i.status === "overdue").length;

  const priorityOrder = ["high", "medium", "low"];
  const sorted = [...items].sort((a, b) => {
    const aPending = a.status === "pending" || a.status === "overdue";
    const bPending = b.status === "pending" || b.status === "overdue";
    if (aPending && !bPending) return -1;
    if (!aPending && bPending) return 1;
    return priorityOrder.indexOf(a.priority) - priorityOrder.indexOf(b.priority);
  });

  return (
    <div className="space-y-6">
      <PageHeader
        badge={`${pendingCount} pending`}
        title="Action Items"
        subtitle="What we need from you to keep the project moving."
      />

      {/* Summary */}
      <ScrollReveal>
        <GlassCard className="border-amber-500/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-200">
                {pendingCount} item{pendingCount !== 1 ? "s" : ""} need{pendingCount === 1 ? "s" : ""} your attention
              </p>
              <p className="text-xs text-slate-600 mt-0.5">
                Faster responses = faster delivery.
              </p>
            </div>
          </div>
        </GlassCard>
      </ScrollReveal>

      {items.length === 0 && (
        <GlassCard>
          <p className="text-sm text-slate-600 text-center py-4">No action items at this time. Check back soon.</p>
        </GlassCard>
      )}

      {/* Items */}
      <div className="space-y-3 lg:grid lg:grid-cols-2 lg:gap-4 lg:space-y-0">
        {sorted.map((item, i) => {
          const isExpanded = expandedId === item.id;
          const prio = priorityConfig[item.priority] ?? priorityConfig.medium;
          const status = statusConfig[item.status] ?? statusConfig.pending;

          return (
            <ScrollReveal key={item.id} delay={i * 0.04}>
              <div className="glass-card rounded-2xl overflow-hidden">
                <button
                  onClick={() => setExpandedId(isExpanded ? null : item.id)}
                  className="w-full text-left p-5 md:p-6 min-h-[56px]"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1.5">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border ${prio.color}`}>
                          {prio.label}
                        </span>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border ${status.color}`}>
                          {status.label}
                        </span>
                        {item.dueDate && (
                          <span className="text-[10px] text-slate-700">Due: {item.dueDate}</span>
                        )}
                      </div>
                      <h3 className="text-sm font-semibold text-slate-200">{item.title}</h3>
                      {item.description && (
                        <p className="text-xs text-slate-600 mt-1">{item.description}</p>
                      )}
                    </div>
                    <svg
                      className={`w-4 h-4 text-slate-700 transition-transform flex-shrink-0 mt-1 ${isExpanded ? "rotate-180" : ""}`}
                      fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </div>
                </button>

                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="px-5 md:px-6 pb-5 md:pb-6"
                  >
                    <div className="pt-4 border-t border-white/5">
                      <p className="text-xs text-slate-600">Contact julian@aiacrobatics.com to address this item.</p>
                    </div>
                  </motion.div>
                )}
              </div>
            </ScrollReveal>
          );
        })}
      </div>
    </div>
  );
}
