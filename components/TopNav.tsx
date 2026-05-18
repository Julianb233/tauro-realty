"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { clientInfo } from "@/data/client-data";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Progress", href: "/progress" },
  { label: "Deliverables", href: "/deliverables" },
  { label: "Calendar", href: "/calendar" },
  { label: "Activity", href: "/activity" },
  { label: "More", href: "/more" },
];

export default function TopNav() {
  const pathname = usePathname();

  return (
    <header className="hidden lg:flex items-center justify-between mb-6 sticky top-2 z-40 glass-card rounded-2xl px-5 py-3">
      {/* Left: Client name */}
      <div className="flex items-center gap-2.5 flex-shrink-0">
        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center text-white text-xs font-bold">
          {clientInfo.name.charAt(0)}
        </div>
        <span className="text-sm font-semibold text-slate-200">{clientInfo.name}</span>
      </div>

      {/* Center: Pill-style nav */}
      <nav className="flex items-center gap-1">
        {navLinks.map((link) => {
          const active =
            link.href === "/"
              ? pathname === "/"
              : pathname.startsWith(link.href);

          return (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                "rounded-full px-4 py-2 text-xs font-medium transition-colors",
                active
                  ? "bg-white text-slate-900"
                  : "text-slate-600 hover:text-slate-200 hover:bg-white/5"
              )}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* Right: Actions */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <button className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-white/5 transition-colors">
          <svg className="h-4 w-4 text-slate-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
        </button>
        <button className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-white/5 transition-colors">
          <svg className="h-4 w-4 text-slate-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
          </svg>
        </button>
        <div className="h-9 w-9 overflow-hidden rounded-full bg-gradient-to-br from-blue-500 to-emerald-500" />
      </div>
    </header>
  );
}
