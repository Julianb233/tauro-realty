"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import GlassCard from "@/components/GlassCard";
import PageHeader from "@/components/PageHeader";
import ScrollReveal from "@/components/ScrollReveal";
import { hubLinks, clientInfo } from "@/data/client-data";
import { getPendingActionItems } from "@/data/action-items";
import { deliverableStats } from "@/data/deliverables";
import { changelogStats } from "@/data/changelog";

const menuItems = [
  {
    label: "Changelog",
    description: `${changelogStats.totalEntries} project updates`,
    href: "/changelog",
    iconPath: "M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25",
  },
  {
    label: "Deliverables",
    description: `${deliverableStats.delivered} delivered, ${deliverableStats.planned} planned`,
    href: "/deliverables",
    iconPath: "M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15a2.25 2.25 0 012.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z",
  },
  {
    label: "Action Items",
    description: `${getPendingActionItems().length} pending items`,
    href: "/action-items",
    iconPath: "M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15a2.25 2.25 0 012.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75",
  },
  {
    label: "Activity Feed",
    description: "Full project timeline",
    href: "/activity",
    iconPath: "M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    label: "Progress & Roadmap",
    description: "Phases and milestones",
    href: "/progress",
    iconPath: "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z",
  },
];

export default function MorePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="More" subtitle="Project resources, links, and settings" />

      {/* Navigation Links */}
      <div className="space-y-2">
        {menuItems.map((item, i) => (
          <ScrollReveal key={item.label} delay={i * 0.04}>
            <Link href={item.href}>
              <GlassCard hover>
                <div className="flex items-center gap-4 min-h-[44px]">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d={item.iconPath} />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-200">{item.label}</p>
                    <p className="text-xs text-slate-400">{item.description}</p>
                  </div>
                  <svg className="w-4 h-4 text-slate-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </div>
              </GlassCard>
            </Link>
          </ScrollReveal>
        ))}
      </div>

      {/* Hub Links Section */}
      <ScrollReveal delay={0.2}>
        <div>
          <h2 className="text-base font-semibold text-slate-200 mb-3">Project Hub</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {hubLinks
              .filter((link) => link.url.startsWith("http"))
              .map((link, i) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GlassCard hover delay={i * 0.03}>
                    <p className="text-sm font-semibold text-slate-200">{link.label}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{link.description}</p>
                  </GlassCard>
                </a>
              ))}
          </div>
        </div>
      </ScrollReveal>

      {/* How We Work */}
      <ScrollReveal delay={0.25}>
        <div>
          <h2 className="text-base font-semibold text-slate-200 mb-3">How We Work</h2>
          <GlassCard>
            <div className="space-y-4 text-sm text-slate-300">
              <div>
                <p className="font-semibold text-slate-200 mb-1">Communication</p>
                <p className="text-xs text-slate-400">
                  We text you updates when deliverables ship. Check this portal anytime for the latest status.
                  For questions, reply to any text or book a call.
                </p>
              </div>
              <div>
                <p className="font-semibold text-slate-200 mb-1">Development Cadence</p>
                <p className="text-xs text-slate-400">
                  We work in focused phases — each phase has clear deliverables and gets shipped as a unit.
                  You will see progress here in real-time as phases complete.
                </p>
              </div>
              <div>
                <p className="font-semibold text-slate-200 mb-1">Your Input</p>
                <p className="text-xs text-slate-400">
                  When we need something from you, it will appear in the Action Items page
                  and we will text you. Faster responses = faster delivery.
                </p>
              </div>
            </div>
          </GlassCard>
        </div>
      </ScrollReveal>

      {/* Contact */}
      <ScrollReveal delay={0.3}>
        <div>
          <h2 className="text-base font-semibold text-slate-200 mb-3">Contact</h2>
          <GlassCard>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-semibold text-slate-200">Julian Bradley</p>
                <p className="text-xs text-slate-400">AI Acrobatics — Project Lead</p>
              </div>
              <div className="flex gap-4">
                <a href="mailto:julian@aiacrobatics.com" className="text-sm text-blue-400 hover:text-blue-300 min-h-[44px] flex items-center">
                  julian@aiacrobatics.com
                </a>
              </div>
              <a
                href="https://calendly.com/julian-aiacrobatics"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-500/20 text-blue-400 text-sm font-medium hover:bg-blue-500/30 transition-colors min-h-[44px]"
              >
                Book a Call
              </a>
            </div>
          </GlassCard>
        </div>
      </ScrollReveal>

      {/* Footer */}
      <div className="text-center pt-4 pb-8">
        <p className="text-xs text-slate-600">Powered by AI Acrobatics</p>
      </div>
    </div>
  );
}
