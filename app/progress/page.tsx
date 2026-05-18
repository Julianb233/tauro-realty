"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import GlassCard from "@/components/GlassCard";
import PageHeader from "@/components/PageHeader";
import ScrollReveal from "@/components/ScrollReveal";
import StatusBadge from "@/components/StatusBadge";
import { milestones, milestoneProgress } from "@/data/milestones";
import { clientInfo } from "@/data/client-data";

export default function ProgressPage() {
  const [expandedPhase, setExpandedPhase] = useState<number | null>(
    milestones.flatMap((m) => m.phases).find((p) => p.status === "active")?.id ?? null
  );

  return (
    <div className="space-y-6">
      <PageHeader
        badge={`${milestoneProgress.completedPhases}/${milestoneProgress.totalPhases} phases done`}
        title="Progress"
        subtitle={`Roadmap, milestones, and phase status for ${clientInfo.name}.`}
      />

      {/* Overall Progress */}
      <ScrollReveal>
        <GlassCard>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-white">{milestoneProgress.currentMilestone}</h2>
            <span className="text-sm text-slate-600">
              Phase {milestoneProgress.completedPhases} of {milestoneProgress.totalPhases}
            </span>
          </div>
          <div className="w-full bg-white/5 rounded-full h-3">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${milestoneProgress.percentComplete}%` }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="bg-gradient-to-r from-blue-500 to-emerald-500 h-3 rounded-full relative"
            >
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-bold text-white">
                {milestoneProgress.percentComplete}%
              </span>
            </motion.div>
          </div>
        </GlassCard>
      </ScrollReveal>

      {/* Milestones */}
      {milestones.map((milestone, mi) => (
        <ScrollReveal key={milestone.id} delay={mi * 0.05}>
          <div className="space-y-3">
            {/* Milestone Header */}
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${
                milestone.status === "completed" ? "bg-emerald-400" :
                milestone.status === "active" ? "bg-blue-400" : "bg-slate-500"
              }`} />
              <div>
                <h2 className="text-lg font-bold text-slate-200">{milestone.name}</h2>
                <p className="text-xs text-slate-700">{milestone.timeframe} &mdash; {milestone.description}</p>
              </div>
            </div>

            {/* Phase Cards */}
            <div className="space-y-2 lg:grid lg:grid-cols-2 lg:gap-3 lg:space-y-0 ml-1.5 pl-4 border-l border-white/5">
              {milestone.phases.map((phase, pi) => {
                const expanded = expandedPhase === phase.id;
                const doneCount = phase.deliverables.filter((d) => d.done).length;

                return (
                  <GlassCard key={phase.id} delay={pi * 0.03}>
                    <button
                      onClick={() => setExpandedPhase(expanded ? null : phase.id)}
                      className="w-full text-left flex items-center gap-3 min-h-[44px]"
                    >
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-sm font-bold text-slate-600">
                        {phase.id}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="text-sm font-semibold text-slate-200 truncate">{phase.name}</p>
                          <StatusBadge status={phase.status} />
                        </div>
                        <p className="text-xs text-slate-700 mt-0.5">{phase.dateRange}</p>
                      </div>
                      <span className="text-xs text-slate-700 flex-shrink-0">
                        {doneCount}/{phase.deliverables.length}
                      </span>
                      <svg
                        className={`w-4 h-4 text-slate-700 transition-transform ${expanded ? "rotate-180" : ""}`}
                        fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                      </svg>
                    </button>

                    {expanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="mt-4 pt-4 border-t border-white/5"
                      >
                        <p className="text-xs text-slate-600 mb-3">{phase.description}</p>
                        <ul className="space-y-2">
                          {phase.deliverables.map((d, j) => (
                            <li key={j} className="flex items-center gap-2 text-sm">
                              {d.done ? (
                                <svg className="w-4 h-4 text-emerald-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                              ) : (
                                <div className="w-4 h-4 rounded-full border border-slate-600 flex-shrink-0" />
                              )}
                              <span className={d.done ? "text-slate-600" : "text-slate-700"}>{d.label}</span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </GlassCard>
                );
              })}
            </div>
          </div>
        </ScrollReveal>
      ))}
    </div>
  );
}
