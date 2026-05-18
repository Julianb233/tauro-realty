"use client";

// Deliverables page — reads from static data/deliverables.ts.
// Detail pages (/deliverables/[id]) use array-index routing that depends on
// the static array order, so deliverables stay static for now.
// Convex deliverables are written but not used as primary source here until
// the detail-page router is refactored to use Convex IDs (tracked separately).

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import GlassCard from "@/components/GlassCard";
import PageHeader from "@/components/PageHeader";
import ScrollReveal from "@/components/ScrollReveal";
import {
  deliverables,
  deliverableStats,
  getDeliverablesByStatus,
  type DeliverableStatus,
  type DeliverableType,
} from "@/data/deliverables";
import { clientInfo } from "@/data/client-data";

const typeBadgeColors: Record<DeliverableType, string> = {
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

const sectionConfig: {
  status: DeliverableStatus;
  title: string;
  emptyText: string;
  dotColor: string;
  borderColor: string;
}[] = [
  { status: "delivered", title: "Delivered", emptyText: "No deliverables yet.", dotColor: "bg-emerald-400", borderColor: "border-emerald-500/20" },
  { status: "in-progress", title: "In Progress", emptyText: "Nothing in progress.", dotColor: "bg-blue-400", borderColor: "border-blue-500/20" },
  { status: "planned", title: "Planned", emptyText: "No planned items.", dotColor: "bg-slate-400", borderColor: "border-slate-500/20" },
];

export default function DeliverablesPage() {
  const [expanded, setExpanded] = useState<Record<DeliverableStatus, boolean>>({
    delivered: true,
    "in-progress": true,
    planned: false,
  });

  const toggle = (status: DeliverableStatus) => {
    setExpanded((prev) => ({ ...prev, [status]: !prev[status] }));
  };

  const completionPercent = Math.round(
    (deliverableStats.delivered / deliverableStats.total) * 100
  );

  return (
    <div className="space-y-6">
      <PageHeader
        badge={`${deliverableStats.total} total`}
        title="Deliverables"
        subtitle={`Everything built, in progress, and planned for ${clientInfo.name}.`}
      />

      {/* Stats Bar */}
      <ScrollReveal>
        <GlassCard>
          <div className="flex items-center gap-4 sm:gap-6 text-sm flex-wrap lg:flex-nowrap lg:justify-start">
            <div>
              <span className="text-2xl font-bold text-emerald-400">{deliverableStats.delivered}</span>
              <span className="text-slate-600 ml-1.5">delivered</span>
            </div>
            <div className="h-6 w-px bg-white/10 hidden sm:block" />
            <div>
              <span className="text-2xl font-bold text-blue-400">{deliverableStats.inProgress}</span>
              <span className="text-slate-600 ml-1.5">in progress</span>
            </div>
            <div className="h-6 w-px bg-white/10 hidden sm:block" />
            <div>
              <span className="text-2xl font-bold text-slate-600">{deliverableStats.planned}</span>
              <span className="text-slate-600 ml-1.5">planned</span>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-slate-700">Overall completion</span>
              <span className="text-xs text-slate-600 font-medium">{completionPercent}%</span>
            </div>
            <div className="w-full bg-white/5 rounded-full h-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${completionPercent}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="bg-gradient-to-r from-emerald-500 to-blue-500 h-2 rounded-full"
              />
            </div>
          </div>
        </GlassCard>
      </ScrollReveal>

      {/* Sections */}
      {sectionConfig.map((section) => {
        const items = getDeliverablesByStatus(section.status);
        const isOpen = expanded[section.status];

        return (
          <ScrollReveal key={section.status} delay={0.05}>
            <div className={`glass-card rounded-2xl border ${section.borderColor} overflow-hidden`}>
              <button
                onClick={() => toggle(section.status)}
                className="w-full flex items-center justify-between p-5 md:p-6 min-h-[56px]"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${section.dotColor}`} />
                  <h2 className="text-base font-semibold text-slate-200">{section.title}</h2>
                  <span className="text-xs text-slate-700">({items.length})</span>
                </div>
                <svg
                  className={`w-4 h-4 text-slate-700 transition-transform ${isOpen ? "rotate-180" : ""}`}
                  fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </button>

              {isOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="px-5 md:px-6 pb-5 md:pb-6 grid grid-cols-1 lg:grid-cols-2 gap-2"
                >
                  {items.map((item, i) => {
                    const globalIndex = deliverables.indexOf(item);
                    return (
                      <Link
                        key={item.name}
                        href={`/deliverables/${globalIndex}`}
                        className="flex items-start gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className="text-sm font-medium text-slate-200 group-hover:text-white">{item.name}</p>
                            <span
                              className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border ${
                                typeBadgeColors[item.type]
                              }`}
                            >
                              {item.type}
                            </span>
                            {item.approval === "pending-review" && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-amber-100 text-amber-700">
                                Needs Review
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-600 mt-1">{item.description}</p>
                          {item.deliveredDate && (
                            <p className="text-[10px] text-slate-700 mt-1.5">Delivered {item.deliveredDate}</p>
                          )}
                        </div>
                        <svg className="w-4 h-4 text-slate-700 group-hover:text-white flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                      </Link>
                    );
                  })}
                </motion.div>
              )}
            </div>
          </ScrollReveal>
        );
      })}
    </div>
  );
}
