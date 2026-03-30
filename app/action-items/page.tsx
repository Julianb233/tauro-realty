"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import GlassCard from "@/components/GlassCard";
import PageHeader from "@/components/PageHeader";
import ScrollReveal from "@/components/ScrollReveal";
import { actionItems, getPendingActionItems, type ActionPriority } from "@/data/action-items";

const priorityConfig: Record<ActionPriority, { color: string; label: string }> = {
  high: { color: "bg-rose-500/20 text-rose-400 border-rose-500/30", label: "High" },
  medium: { color: "bg-amber-500/20 text-amber-400 border-amber-500/30", label: "Medium" },
  low: { color: "bg-slate-500/20 text-slate-400 border-slate-500/30", label: "Low" },
};

const statusConfig = {
  pending: { color: "bg-amber-500/20 text-amber-400 border-amber-500/30", label: "Pending" },
  submitted: { color: "bg-blue-500/20 text-blue-400 border-blue-500/30", label: "Submitted" },
  completed: { color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30", label: "Completed" },
};

export default function ActionItemsPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const pendingCount = getPendingActionItems().length;

  // Sort: pending first, then by priority (high > medium > low)
  const priorityOrder: ActionPriority[] = ["high", "medium", "low"];
  const sorted = [...actionItems].sort((a, b) => {
    if (a.status === "pending" && b.status !== "pending") return -1;
    if (a.status !== "pending" && b.status === "pending") return 1;
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
              <p className="text-xs text-slate-400 mt-0.5">
                Faster responses = faster delivery. Tap any item to see step-by-step instructions.
              </p>
            </div>
          </div>
        </GlassCard>
      </ScrollReveal>

      {/* Items */}
      <div className="space-y-3">
        {sorted.map((item, i) => {
          const isExpanded = expandedId === item.id;
          const prio = priorityConfig[item.priority];
          const status = statusConfig[item.status];

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
                        <span className="text-[10px] text-slate-500">Due: {item.dueDate}</span>
                      </div>
                      <h3 className="text-sm font-semibold text-slate-200">{item.title}</h3>
                      <p className="text-xs text-slate-400 mt-1">{item.description}</p>
                    </div>
                    <svg
                      className={`w-4 h-4 text-slate-500 transition-transform flex-shrink-0 mt-1 ${isExpanded ? "rotate-180" : ""}`}
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
                      <p className="text-xs font-semibold text-slate-300 mb-3">How to complete this:</p>
                      <ol className="space-y-2">
                        {item.instructions.map((step, j) => (
                          <li key={j} className="flex items-start gap-2.5 text-xs text-slate-300">
                            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-500/15 text-blue-400 flex items-center justify-center text-[10px] font-bold mt-0.5">
                              {j + 1}
                            </span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ol>
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
