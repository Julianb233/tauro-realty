"use client";

import { useState } from "react";
import { motion } from "framer-motion";
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

const typeBadgeColors: Record<DeliverableType, string> = {
  Website: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  Tool: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  Infrastructure: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  Strategy: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  Feature: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
  Integration: "bg-pink-500/20 text-pink-400 border-pink-500/30",
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
        subtitle="Everything built, in progress, and planned for Shipping Savior."
      />

      {/* Stats Bar */}
      <ScrollReveal>
        <GlassCard>
          <div className="flex items-center gap-6 text-sm flex-wrap">
            <div>
              <span className="text-2xl font-bold text-emerald-400">{deliverableStats.delivered}</span>
              <span className="text-slate-400 ml-1.5">delivered</span>
            </div>
            <div className="h-6 w-px bg-white/10 hidden sm:block" />
            <div>
              <span className="text-2xl font-bold text-blue-400">{deliverableStats.inProgress}</span>
              <span className="text-slate-400 ml-1.5">in progress</span>
            </div>
            <div className="h-6 w-px bg-white/10 hidden sm:block" />
            <div>
              <span className="text-2xl font-bold text-slate-400">{deliverableStats.planned}</span>
              <span className="text-slate-400 ml-1.5">planned</span>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-slate-500">Overall completion</span>
              <span className="text-xs text-slate-400 font-medium">{completionPercent}%</span>
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
                  <span className="text-xs text-slate-500">({items.length})</span>
                </div>
                <svg
                  className={`w-4 h-4 text-slate-500 transition-transform ${isOpen ? "rotate-180" : ""}`}
                  fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </button>

              {isOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="px-5 md:px-6 pb-5 md:pb-6 space-y-2"
                >
                  {items.map((item, i) => (
                    <div
                      key={item.name}
                      className="flex items-start gap-3 p-3 rounded-xl bg-white/5"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="text-sm font-medium text-slate-200">{item.name}</p>
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border ${
                              typeBadgeColors[item.type]
                            }`}
                          >
                            {item.type}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">{item.description}</p>
                        {item.deliveredDate && (
                          <p className="text-[10px] text-slate-500 mt-1.5">Delivered {item.deliveredDate}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </div>
          </ScrollReveal>
        );
      })}
    </div>
  );
}
