"use client";

import { useState } from "react";
import GlassCard from "@/components/GlassCard";
import PageHeader from "@/components/PageHeader";
import ScrollReveal from "@/components/ScrollReveal";
import type { ConvexFeedEntry } from "@/lib/portal-data";

type FilterType = "all" | string;

// Shared type + icon map — mirrors the original static ActivityPage styling.
const typeConfig: Record<string, { icon: string; color: string; label: string }> = {
  milestone: { icon: "trophy", color: "bg-yellow-500/15 text-yellow-400", label: "Milestone" },
  feature: { icon: "sparkles", color: "bg-emerald-500/15 text-emerald-400", label: "Feature" },
  infrastructure: { icon: "wrench", color: "bg-purple-500/15 text-purple-400", label: "Infrastructure" },
  planning: { icon: "clipboard", color: "bg-blue-500/15 text-blue-400", label: "Planning" },
  deploy: { icon: "rocket", color: "bg-cyan-500/15 text-cyan-400", label: "Deploy" },
  design: { icon: "palette", color: "bg-pink-500/15 text-pink-400", label: "Design" },
  content: { icon: "document", color: "bg-amber-500/15 text-amber-400", label: "Content" },
  improvement: { icon: "sparkles", color: "bg-teal-500/15 text-teal-400", label: "Improvement" },
};

const DEFAULT_CONFIG = { icon: "sparkles", color: "bg-slate-500/15 text-slate-400", label: "" };

const ITEMS_PER_PAGE = 10;

interface Props {
  entries: ConvexFeedEntry[];
}

export default function ActivityClient({ entries }: Props) {
  const [filter, setFilter] = useState<FilterType>("all");
  const [showCount, setShowCount] = useState(ITEMS_PER_PAGE);

  const categories = Array.from(new Set(entries.map((e) => e.category)));
  const filtered = filter === "all" ? entries : entries.filter((e) => e.category === filter);
  const visible = filtered.slice(0, showCount);
  const hasMore = showCount < filtered.length;

  return (
    <div className="space-y-6">
      <PageHeader
        badge="Live feed"
        title="Activity"
        subtitle="Full timeline of project updates and milestones."
      />

      {/* Live notice */}
      <ScrollReveal>
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-blue-500/10 border border-blue-500/20">
          <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
          <p className="text-xs text-blue-400">Live feed. New updates appear automatically as work is completed.</p>
        </div>
      </ScrollReveal>

      {/* Filter Tabs */}
      <ScrollReveal delay={0.05}>
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0">
          <button
            onClick={() => { setFilter("all"); setShowCount(ITEMS_PER_PAGE); }}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors min-h-[36px] ${
              filter === "all"
                ? "bg-white/10 text-white border border-white/20"
                : "text-slate-600 border border-white/5 hover:border-white/15"
            }`}
          >
            All ({entries.length})
          </button>
          {categories.map((cat) => {
            const count = entries.filter((e) => e.category === cat).length;
            if (count === 0) return null;
            const cfg = typeConfig[cat] ?? DEFAULT_CONFIG;
            return (
              <button
                key={cat}
                onClick={() => { setFilter(cat); setShowCount(ITEMS_PER_PAGE); }}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors min-h-[36px] ${
                  filter === cat
                    ? "bg-white/10 text-white border border-white/20"
                    : "text-slate-600 border border-white/5 hover:border-white/15"
                }`}
              >
                {cfg.label || cat} ({count})
              </button>
            );
          })}
        </div>
      </ScrollReveal>

      {entries.length === 0 && (
        <GlassCard>
          <p className="text-sm text-slate-600 text-center py-4">No activity yet. Check back soon.</p>
        </GlassCard>
      )}

      {/* Timeline */}
      <div className="relative">
        <div className="absolute left-[19px] lg:left-[99px] top-0 bottom-0 w-px bg-white/5" />
        <div className="space-y-3">
          {visible.map((item, i) => {
            const config = typeConfig[item.category] ?? DEFAULT_CONFIG;
            return (
              <ScrollReveal key={item.id} delay={i * 0.03}>
                <div className="flex gap-4 relative">
                  <div className="hidden lg:flex w-20 flex-shrink-0 items-start justify-end pt-5">
                    <span className="text-xs text-slate-700 font-medium">{item.date}</span>
                  </div>
                  <div className={`w-10 h-10 rounded-xl ${config.color} flex items-center justify-center flex-shrink-0 z-10`}>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
                    </svg>
                  </div>
                  <GlassCard className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border ${config.color.replace("/15", "/20")} border-current/20`}>
                        {config.label || item.category}
                      </span>
                      <span className="text-[10px] text-slate-700 lg:hidden">{item.date}</span>
                    </div>
                    <h3 className="text-sm font-semibold text-slate-200">{item.title}</h3>
                    {item.description && (
                      <p className="text-xs text-slate-600 mt-0.5">{item.description}</p>
                    )}
                  </GlassCard>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>

      {hasMore && (
        <div className="text-center">
          <button
            onClick={() => setShowCount((c) => c + ITEMS_PER_PAGE)}
            className="px-6 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-slate-600 hover:bg-white/10 transition-colors min-h-[44px]"
          >
            Show more ({filtered.length - showCount} remaining)
          </button>
        </div>
      )}

      {filtered.length === 0 && entries.length > 0 && (
        <GlassCard>
          <p className="text-sm text-slate-600 text-center py-4">No activity matching this filter.</p>
        </GlassCard>
      )}
    </div>
  );
}
