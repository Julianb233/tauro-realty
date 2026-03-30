"use client";

import { useState } from "react";
import GlassCard from "@/components/GlassCard";
import PageHeader from "@/components/PageHeader";
import ScrollReveal from "@/components/ScrollReveal";
import { recentActivity, type ActivityType } from "@/data/client-data";

const typeConfig: Record<ActivityType, { icon: string; color: string; label: string }> = {
  milestone: { icon: "trophy", color: "bg-yellow-500/15 text-yellow-400", label: "Milestone" },
  feature: { icon: "sparkles", color: "bg-emerald-500/15 text-emerald-400", label: "Feature" },
  infrastructure: { icon: "wrench", color: "bg-purple-500/15 text-purple-400", label: "Infrastructure" },
  planning: { icon: "clipboard", color: "bg-blue-500/15 text-blue-400", label: "Planning" },
  deploy: { icon: "rocket", color: "bg-cyan-500/15 text-cyan-400", label: "Deploy" },
  design: { icon: "palette", color: "bg-pink-500/15 text-pink-400", label: "Design" },
  content: { icon: "document", color: "bg-amber-500/15 text-amber-400", label: "Content" },
};

const typeIcons: Record<string, React.ReactNode> = {
  trophy: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M18.75 4.236c.982.143 1.954.317 2.916.52A6.003 6.003 0 0016.27 9.728M18.75 4.236V4.5c0 2.108-.966 3.99-2.48 5.228m0 0a6.023 6.023 0 01-2.52.854m0 0H12m.75 0a6.023 6.023 0 002.52-.854" />
    </svg>
  ),
  sparkles: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
    </svg>
  ),
  wrench: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.1 5.1a2.121 2.121 0 01-3-3l5.1-5.1m0 0L16.5 3.67a2.121 2.121 0 013 3l-8.08 8.5z" />
    </svg>
  ),
  clipboard: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15a2.25 2.25 0 012.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" />
    </svg>
  ),
  rocket: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
    </svg>
  ),
  palette: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z" />
    </svg>
  ),
  document: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
  ),
};

type FilterType = "all" | ActivityType;

const filterOptions: { value: FilterType; label: string }[] = [
  { value: "all", label: "All" },
  { value: "feature", label: "Features" },
  { value: "infrastructure", label: "Infra" },
  { value: "planning", label: "Planning" },
  { value: "deploy", label: "Deploys" },
  { value: "design", label: "Design" },
  { value: "content", label: "Content" },
  { value: "milestone", label: "Milestones" },
];

const ITEMS_PER_PAGE = 10;

export default function ActivityPage() {
  const [filter, setFilter] = useState<FilterType>("all");
  const [showCount, setShowCount] = useState(ITEMS_PER_PAGE);

  const filtered = filter === "all"
    ? recentActivity
    : recentActivity.filter((a) => a.type === filter);

  const visible = filtered.slice(0, showCount);
  const hasMore = showCount < filtered.length;

  return (
    <div className="space-y-6">
      <PageHeader
        badge="Live feed"
        title="Activity"
        subtitle="Full timeline of project updates and milestones."
      />

      {/* Notice */}
      <ScrollReveal>
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-blue-500/10 border border-blue-500/20">
          <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
          <p className="text-xs text-blue-400">This is a live feed. New updates appear automatically as work is completed.</p>
        </div>
      </ScrollReveal>

      {/* Filter Tabs */}
      <ScrollReveal delay={0.05}>
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0">
          {filterOptions.map((opt) => {
            const count = opt.value === "all"
              ? recentActivity.length
              : recentActivity.filter((a) => a.type === opt.value).length;
            if (count === 0 && opt.value !== "all") return null;
            return (
              <button
                key={opt.value}
                onClick={() => { setFilter(opt.value); setShowCount(ITEMS_PER_PAGE); }}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors min-h-[36px] ${
                  filter === opt.value
                    ? "bg-white/10 text-white border border-white/20"
                    : "text-slate-400 border border-white/5 hover:border-white/15"
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </ScrollReveal>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-[19px] top-0 bottom-0 w-px bg-white/5" />

        <div className="space-y-3">
          {visible.map((item, i) => {
            const config = typeConfig[item.type];
            return (
              <ScrollReveal key={`${item.date}-${item.title}`} delay={i * 0.03}>
                <div className="flex gap-4 relative">
                  {/* Icon */}
                  <div className={`w-10 h-10 rounded-xl ${config.color} flex items-center justify-center flex-shrink-0 z-10`}>
                    {typeIcons[config.icon]}
                  </div>
                  {/* Content */}
                  <GlassCard className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border ${config.color.replace("/15", "/20")} border-current/20`}>
                        {config.label}
                      </span>
                      <span className="text-[10px] text-slate-500">{item.date}</span>
                    </div>
                    <h3 className="text-sm font-semibold text-slate-200">{item.title}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">{item.description}</p>
                  </GlassCard>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>

      {/* Load More */}
      {hasMore && (
        <div className="text-center">
          <button
            onClick={() => setShowCount((c) => c + ITEMS_PER_PAGE)}
            className="px-6 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-slate-300 hover:bg-white/10 transition-colors min-h-[44px]"
          >
            Show more ({filtered.length - showCount} remaining)
          </button>
        </div>
      )}

      {filtered.length === 0 && (
        <GlassCard>
          <p className="text-sm text-slate-400 text-center py-4">No activity matching this filter.</p>
        </GlassCard>
      )}
    </div>
  );
}
