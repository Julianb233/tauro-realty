"use client";

import GlassCard from "@/components/GlassCard";
import PageHeader from "@/components/PageHeader";
import ScrollReveal from "@/components/ScrollReveal";
import {
  services,
  serviceStats,
  getActiveServices,
  getDiscussedServices,
  type Service,
  type ServiceStatus,
} from "@/data/services";
import { clientInfo } from "@/data/client-data";

const statusConfig: Record<ServiceStatus, { label: string; dot: string; badge: string }> = {
  active: {
    label: "Active Services",
    dot: "bg-emerald-500",
    badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  discussed: {
    label: "On Your Roadmap",
    dot: "bg-blue-500",
    badge: "bg-blue-50 text-blue-700 border-blue-200",
  },
};

const colorMap: Record<string, string> = {
  blue: "bg-blue-50 text-blue-600",
  emerald: "bg-emerald-50 text-emerald-600",
  amber: "bg-amber-50 text-amber-600",
  violet: "bg-violet-50 text-violet-600",
  pink: "bg-pink-50 text-pink-600",
  cyan: "bg-cyan-50 text-cyan-600",
  orange: "bg-orange-50 text-orange-600",
  rose: "bg-rose-50 text-rose-600",
};

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const config = statusConfig[service.status];
  const iconColor = colorMap[service.color] || colorMap.blue;

  return (
    <ScrollReveal delay={index * 0.04}>
      <GlassCard>
        <div className="flex items-start gap-4">
          <div className={`w-10 h-10 rounded-xl ${iconColor} flex items-center justify-center flex-shrink-0`}>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d={service.icon} />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-sm font-semibold text-black">{service.name}</h3>
              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border ${config.badge}`}>
                {service.status === "active" ? "Active" : "Discussed"}
              </span>
            </div>
            <p className="text-xs text-gray-700 mt-1">{service.description}</p>

            {service.scope && (
              <div className="mt-3 p-2.5 rounded-xl bg-emerald-50 border border-emerald-200">
                <p className="text-[11px] text-emerald-700 font-medium">Your plan</p>
                <p className="text-xs text-gray-600 mt-0.5">{service.scope}</p>
              </div>
            )}

            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {service.features.map((f) => (
                <div key={f.label} className="flex items-center gap-2">
                  {f.included ? (
                    <svg className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  ) : (
                    <svg className="w-3.5 h-3.5 text-gray-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  )}
                  <span className={`text-xs ${f.included ? "text-gray-700" : "text-gray-600"}`}>{f.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </GlassCard>
    </ScrollReveal>
  );
}

export default function ServicesPage() {
  const active = getActiveServices();
  const discussed = getDiscussedServices();

  return (
    <div className="space-y-6">
      <PageHeader
        badge={`${serviceStats.active} active`}
        title="Your Services"
        subtitle={`Services we're delivering for ${clientInfo.name}.`}
      />

      {/* Active Services */}
      {active.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <h2 className="text-sm font-semibold text-black">Active Services ({active.length})</h2>
          </div>
          <div className="space-y-3">
            {active.map((s, i) => (
              <ServiceCard key={s.slug} service={s} index={i} />
            ))}
          </div>
        </div>
      )}

      {/* Discussed / On Roadmap — only if client showed interest */}
      {discussed.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
            <h2 className="text-sm font-semibold text-black">On Your Roadmap ({discussed.length})</h2>
          </div>
          <p className="text-xs text-gray-700 mb-3">Services we&apos;ve discussed and can add when you&apos;re ready.</p>
          <div className="space-y-3">
            {discussed.map((s, i) => (
              <ServiceCard key={s.slug} service={s} index={i} />
            ))}
          </div>
        </div>
      )}

      {/* CTA */}
      <ScrollReveal delay={0.2}>
        <GlassCard>
          <div className="text-center space-y-3">
            <p className="text-sm font-semibold text-black">Have something else in mind?</p>
            <p className="text-xs text-gray-700">
              Let Julian know — we can scope any new services that fit your goals.
            </p>
            <a
              href="https://msgsndr.com/widget/booking/76ergSktTpvayx9tldnl"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-500 text-white text-sm font-medium hover:bg-blue-600 transition-colors min-h-[44px]"
            >
              Book a Call
            </a>
          </div>
        </GlassCard>
      </ScrollReveal>
    </div>
  );
}
