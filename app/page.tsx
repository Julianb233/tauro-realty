import Link from "next/link";
import GlassCard from "@/components/GlassCard";
import ScrollReveal from "@/components/ScrollReveal";
import { clientInfo, stats, snapshot, hubLinks, recentActivity } from "@/data/client-data";
import { deliverableStats } from "@/data/deliverables";
import { milestoneProgress } from "@/data/milestones";
import { getPendingActionItems } from "@/data/action-items";

const healthColors = {
  great: "bg-emerald-500",
  good: "bg-blue-500",
  attention: "bg-amber-500",
  blocked: "bg-rose-500",
};

const healthLabels = {
  great: "On Track",
  good: "Good",
  attention: "Needs Attention",
  blocked: "Blocked",
};

export default function HomePage() {
  const pendingItems = getPendingActionItems().length;

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Mobile Header (hidden on desktop since TopNav handles it) */}
      <header className="lg:hidden">
        <div className="flex items-center gap-2 mb-1">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center text-white text-xs font-bold">
            {clientInfo.name.charAt(0)}
          </div>
          <span className="text-base font-semibold text-slate-200">{clientInfo.name}</span>
        </div>
        <p className="text-xs text-slate-700">{snapshot.month} — Progress Portal</p>
      </header>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-3 sm:gap-4">
        {/* Left Column - Overview */}
        <div className="lg:col-span-4 space-y-3 sm:space-y-4">
          {/* Health Status Card */}
          <ScrollReveal>
            <GlassCard>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-semibold text-slate-200">Project Health</h2>
                <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold text-white ${healthColors[snapshot.health]}`}>
                  <div className="w-1.5 h-1.5 rounded-full bg-white/80 animate-pulse" />
                  {healthLabels[snapshot.health]}
                </div>
              </div>

              <p className="text-xs text-slate-600 mb-4">{snapshot.summary}</p>

              {/* Key Metrics */}
              <div className="grid grid-cols-2 gap-3">
                {stats.map((stat) => (
                  <div key={stat.label} className="p-3 rounded-xl bg-white/5">
                    <p className="text-lg font-bold text-white">{stat.value}</p>
                    <p className="text-[10px] text-slate-700 mt-0.5">{stat.label}</p>
                  </div>
                ))}
              </div>
            </GlassCard>
          </ScrollReveal>

          {/* Action Items Alert */}
          {pendingItems > 0 && (
            <ScrollReveal delay={0.05}>
              <Link href="/action-items">
                <GlassCard hover className="border-amber-500/20">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/15 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-amber-400">{pendingItems} action item{pendingItems !== 1 ? "s" : ""}</p>
                      <p className="text-[10px] text-slate-700">Needs your attention</p>
                    </div>
                    <svg className="w-4 h-4 text-slate-700 ml-auto flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </div>
                </GlassCard>
              </Link>
            </ScrollReveal>
          )}

          {/* CTA Card */}
          <ScrollReveal delay={0.1}>
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 to-emerald-600 p-5 sm:p-6 text-white shadow-lg">
              <div className="relative z-10">
                <h3 className="mb-1 text-lg font-bold">Need something?</h3>
                <p className="text-sm opacity-90 mb-3">Use the chat or book a call.</p>
                <a
                  href="https://msgsndr.com/widget/booking/76ergSktTpvayx9tldnl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-full bg-white px-4 py-2 text-xs font-semibold text-blue-600 transition-transform hover:scale-105"
                >
                  Book a Call
                </a>
              </div>
              <div className="absolute -right-6 -bottom-6 opacity-10">
                <svg width="120" height="120" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="50" fill="white" />
                  <circle cx="80" cy="40" r="30" fill="white" />
                </svg>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Middle Column - Progress & Deliverables */}
        <div className="lg:col-span-5 space-y-3 sm:space-y-4">
          {/* Progress Card */}
          <ScrollReveal delay={0.05}>
            <Link href="/progress">
              <GlassCard hover>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-sm font-semibold text-slate-200">Progress</h2>
                  <span className="text-xs text-slate-700">
                    Phase {milestoneProgress.completedPhases}/{milestoneProgress.totalPhases}
                  </span>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs text-slate-600">{milestoneProgress.currentMilestone}</span>
                    <span className="text-xs text-slate-600 font-medium">{milestoneProgress.percentComplete}%</span>
                  </div>
                  <div className="w-full bg-white/5 rounded-full h-2.5">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-emerald-500 h-2.5 rounded-full transition-all"
                      style={{ width: `${milestoneProgress.percentComplete}%` }}
                    />
                  </div>
                </div>

                {/* Monthly Highlights */}
                <div className="grid grid-cols-2 gap-2">
                  {snapshot.highlights.map((h) => (
                    <div key={h.label} className="flex items-center gap-2 p-2 rounded-lg bg-white/5">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                      <div>
                        <p className="text-[10px] text-slate-700">{h.label}</p>
                        <p className="text-xs font-medium text-slate-600">{h.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </Link>
          </ScrollReveal>

          {/* Deliverables Summary Card */}
          <ScrollReveal delay={0.1}>
            <Link href="/deliverables">
              <GlassCard hover>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-sm font-semibold text-slate-200">Deliverables</h2>
                  <svg className="w-4 h-4 text-slate-700" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </div>

                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="p-3 rounded-xl bg-white/5">
                    <p className="text-2xl font-bold text-emerald-400">{deliverableStats.delivered}</p>
                    <p className="text-[10px] text-slate-700 mt-0.5">Delivered</p>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5">
                    <p className="text-2xl font-bold text-blue-400">{deliverableStats.inProgress}</p>
                    <p className="text-[10px] text-slate-700 mt-0.5">In Progress</p>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5">
                    <p className="text-2xl font-bold text-slate-600">{deliverableStats.planned}</p>
                    <p className="text-[10px] text-slate-700 mt-0.5">Planned</p>
                  </div>
                </div>

                <div className="mt-3">
                  <div className="flex h-2 overflow-hidden rounded-full">
                    <div className="bg-emerald-500" style={{ width: `${Math.round((deliverableStats.delivered / deliverableStats.total) * 100)}%` }} />
                    <div className="bg-blue-500" style={{ width: `${Math.round((deliverableStats.inProgress / deliverableStats.total) * 100)}%` }} />
                    <div className="bg-slate-600" style={{ width: `${Math.round((deliverableStats.planned / deliverableStats.total) * 100)}%` }} />
                  </div>
                </div>
              </GlassCard>
            </Link>
          </ScrollReveal>

          {/* Next Month Focus */}
          <ScrollReveal delay={0.15}>
            <GlassCard>
              <h2 className="text-sm font-semibold text-slate-200 mb-3">Coming Up Next</h2>
              <div className="space-y-2">
                {snapshot.nextMonthFocus.map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-slate-600">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-500/15 text-blue-400 flex items-center justify-center text-[10px] font-bold mt-0.5">
                      {i + 1}
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </ScrollReveal>
        </div>

        {/* Right Column - Activity & Quick Links */}
        <div className="lg:col-span-3 space-y-3 sm:space-y-4">
          {/* Recent Activity */}
          <ScrollReveal delay={0.1}>
            <GlassCard>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-semibold text-slate-200">Recent Activity</h2>
                <Link href="/activity" className="text-[10px] text-blue-400 hover:text-blue-300">
                  View all
                </Link>
              </div>
              <div className="space-y-3">
                {recentActivity.slice(0, 5).map((item, i) => (
                  <div key={i} className="flex gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs font-medium text-slate-600">{item.title}</p>
                      <p className="text-[10px] text-slate-700 mt-0.5">{item.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </ScrollReveal>

          {/* Quick Links */}
          <ScrollReveal delay={0.15}>
            <GlassCard>
              <h2 className="text-sm font-semibold text-slate-200 mb-3">Quick Links</h2>
              <div className="space-y-1.5">
                {hubLinks
                  .filter((link) => link.url.startsWith("http"))
                  .slice(0, 4)
                  .map((link) => (
                    <a
                      key={link.label}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group"
                    >
                      <div>
                        <p className="text-xs font-medium text-slate-600">{link.label}</p>
                        <p className="text-[10px] text-slate-700">{link.description}</p>
                      </div>
                      <svg className="w-3.5 h-3.5 text-slate-600 group-hover:text-slate-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                      </svg>
                    </a>
                  ))}
              </div>
            </GlassCard>
          </ScrollReveal>

          {/* Powered By */}
          <ScrollReveal delay={0.2}>
            <div className="rounded-xl bg-white/5 p-3 text-center">
              <p className="text-[10px] text-slate-600">
                Powered by <span className="text-slate-700">AI Acrobatics</span>
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
