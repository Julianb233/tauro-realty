"use client";

import { useState } from "react";
import GlassCard from "@/components/GlassCard";
import PageHeader from "@/components/PageHeader";
import ScrollReveal from "@/components/ScrollReveal";
import { changelog, changelogStats, type ChangelogCategory } from "@/data/changelog";

const categoryColors: Record<ChangelogCategory, string> = {
  feature: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  content: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  seo: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  fix: "bg-rose-500/20 text-rose-400 border-rose-500/30",
  infrastructure: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  design: "bg-pink-500/20 text-pink-400 border-pink-500/30",
};

const categoryLabels: Record<ChangelogCategory, string> = {
  feature: "Feature",
  content: "Content",
  seo: "SEO",
  fix: "Fix",
  infrastructure: "Infrastructure",
  design: "Design",
};

const allCategories: ChangelogCategory[] = ["feature", "infrastructure", "content", "design", "seo", "fix"];

export default function ChangelogPage() {
  const [filter, setFilter] = useState<ChangelogCategory | "all">("all");

  const filtered = filter === "all" ? changelog : changelog.filter((e) => e.category === filter);

  return (
    <div className="space-y-6">
      <PageHeader
        badge={`${changelogStats.totalEntries} updates`}
        title="Changelog"
        subtitle="Everything shipped for Shipping Savior, in reverse chronological order."
      />

      {/* Stats */}
      <ScrollReveal>
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-3 md:gap-4">
          <GlassCard className="min-w-[140px] md:min-w-0 flex-shrink-0">
            <p className="text-2xl font-bold text-emerald-400">{changelogStats.featuresShipped}</p>
            <p className="text-xs text-slate-400 mt-1">Features Shipped</p>
          </GlassCard>
          <GlassCard className="min-w-[140px] md:min-w-0 flex-shrink-0">
            <p className="text-2xl font-bold text-amber-400">{changelogStats.infrastructureUpdates}</p>
            <p className="text-xs text-slate-400 mt-1">Infra Updates</p>
          </GlassCard>
          <GlassCard className="min-w-[140px] md:min-w-0 flex-shrink-0">
            <p className="text-2xl font-bold text-blue-400">{changelogStats.contentDelivered}</p>
            <p className="text-xs text-slate-400 mt-1">Content Delivered</p>
          </GlassCard>
        </div>
      </ScrollReveal>

      {/* Filter Tabs */}
      <ScrollReveal delay={0.05}>
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors min-h-[36px] ${
              filter === "all"
                ? "bg-white/10 text-white border border-white/20"
                : "text-slate-400 border border-white/5 hover:border-white/15"
            }`}
          >
            All ({changelog.length})
          </button>
          {allCategories.map((cat) => {
            const count = changelog.filter((e) => e.category === cat).length;
            if (count === 0) return null;
            return (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors min-h-[36px] ${
                  filter === cat
                    ? "bg-white/10 text-white border border-white/20"
                    : "text-slate-400 border border-white/5 hover:border-white/15"
                }`}
              >
                {categoryLabels[cat]} ({count})
              </button>
            );
          })}
        </div>
      </ScrollReveal>

      {/* Entries */}
      <div className="space-y-3">
        {filtered.map((entry, i) => (
          <ScrollReveal key={`${entry.date}-${entry.title}`} delay={i * 0.03}>
            <GlassCard>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border ${categoryColors[entry.category]}`}
                  >
                    {categoryLabels[entry.category]}
                  </span>
                  <span className="text-xs text-slate-500">{entry.date}</span>
                </div>
              </div>
              <h3 className="text-sm font-semibold text-slate-200 mb-1">{entry.title}</h3>
              <p className="text-xs text-slate-400 mb-3">{entry.description}</p>
              <ul className="space-y-1.5">
                {entry.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-2 text-xs text-slate-300">
                    <span className="text-emerald-400 mt-0.5 flex-shrink-0">+</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </ScrollReveal>
        ))}
      </div>

      {filtered.length === 0 && (
        <GlassCard>
          <p className="text-sm text-slate-400 text-center py-4">No entries match this filter.</p>
        </GlassCard>
      )}
    </div>
  );
}
