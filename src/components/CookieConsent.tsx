"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  getCookieConsent,
  acceptAll,
  rejectNonEssential,
  setCookieConsent,
  type CookiePreferences,
} from "@/lib/cookie-consent";
import { useFocusTrap } from "@/hooks/useFocusTrap";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [showPrefs, setShowPrefs] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [marketing, setMarketing] = useState(true);

  useEffect(() => {
    const existing = getCookieConsent();
    if (!existing) {
      const timer = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const focusTrapRef = useFocusTrap(visible, {
    onEscape: () => {
      rejectNonEssential();
      setVisible(false);
    },
  });

  if (!visible) return null;

  function handleAcceptAll() {
    acceptAll();
    setVisible(false);
  }

  function handleReject() {
    rejectNonEssential();
    setVisible(false);
  }

  function handleSavePreferences() {
    const prefs: CookiePreferences = {
      essential: true,
      analytics,
      marketing,
      timestamp: new Date().toISOString(),
    };
    setCookieConsent(prefs);
    setVisible(false);
  }

  return (
    <div
      ref={focusTrapRef}
      role="dialog"
      aria-modal="true"
      aria-label="Cookie consent"
      className="fixed bottom-3 right-3 z-[9998] w-[calc(100vw-1.5rem)] max-w-md sm:bottom-5 sm:right-5"
    >
      <div className="rounded-lg border border-gold/25 bg-midnight/94 p-3 shadow-2xl backdrop-blur-xl">
        {!showPrefs ? (
          <div className="flex flex-col gap-3">
            <div className="min-w-0 flex-1">
              <h2 className="font-heading text-sm font-bold text-white">
                Cookies
              </h2>
              <p className="mt-1 text-[11px] leading-relaxed text-white/82">
                Essential cookies keep the site working. Optional analytics stay off unless accepted.{" "}
                <Link
                  href="/cookie-policy"
                  className="text-gold underline underline-offset-2 hover:text-gold-light"
                >
                  Cookie Policy
                </Link>
                .
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={handleReject}
                className="inline-flex min-h-9 items-center justify-center rounded-md border border-white/25 px-3 text-[11px] font-semibold text-white transition-colors hover:border-white/45 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              >
                Reject
              </button>
              <button
                onClick={handleAcceptAll}
                className="inline-flex min-h-9 items-center justify-center rounded-md bg-gold px-3 text-[11px] font-semibold text-near-black transition-colors hover:bg-gold-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                Accept
              </button>
              <button
                onClick={() => setShowPrefs(true)}
                className="inline-flex min-h-9 items-center justify-center rounded-md px-2 text-[11px] font-semibold text-white/90 underline underline-offset-2 transition-colors hover:text-white focus-visible:outline-none"
              >
                Manage
              </button>
            </div>
          </div>
        ) : (
          <>
            <h2 className="font-heading text-base font-bold text-white">
              Cookie Preferences
            </h2>
            <p className="mt-1 text-xs leading-relaxed text-white/85 sm:text-sm">
              Essential cookies stay on. Analytics and marketing only run when
              allowed.
            </p>

            <div className="mt-3 grid gap-2 sm:grid-cols-3">
              <label className="flex items-center justify-between rounded-md border border-white/10 p-3">
                <span className="text-xs font-semibold text-white">Essential</span>
                <input type="checkbox" checked disabled className="h-4 w-4 accent-gold" />
              </label>
              <label className="flex cursor-pointer items-center justify-between rounded-md border border-white/10 p-3 hover:border-white/25">
                <span className="text-xs font-semibold text-white">Analytics</span>
                <input
                  type="checkbox"
                  checked={analytics}
                  onChange={(e) => setAnalytics(e.target.checked)}
                  className="h-4 w-4 accent-gold"
                />
              </label>
              <label className="flex cursor-pointer items-center justify-between rounded-md border border-white/10 p-3 hover:border-white/25">
                <span className="text-xs font-semibold text-white">Marketing</span>
                <input
                  type="checkbox"
                  checked={marketing}
                  onChange={(e) => setMarketing(e.target.checked)}
                  className="h-4 w-4 accent-gold"
                />
              </label>
            </div>

            <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:justify-end">
              <button
                onClick={() => setShowPrefs(false)}
                className="inline-flex min-h-10 items-center justify-center rounded-md px-4 text-xs font-semibold text-white/90 underline underline-offset-2 hover:text-white focus-visible:outline-none"
              >
                Back
              </button>
              <button
                onClick={handleSavePreferences}
                className="inline-flex min-h-10 items-center justify-center rounded-md bg-gold px-4 text-xs font-semibold text-near-black hover:bg-gold-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                Save Preferences
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
