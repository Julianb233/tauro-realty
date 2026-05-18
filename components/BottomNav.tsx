"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BarChart3, ClipboardList, Clock, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { label: "Home", href: "/", icon: Home },
  { label: "Progress", href: "/progress", icon: BarChart3 },
  { label: "Output", href: "/deliverables", icon: ClipboardList },
  { label: "Activity", href: "/activity", icon: Clock },
  { label: "More", href: "/more", icon: MoreHorizontal },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-white/95 backdrop-blur border-t border-gray-200"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex justify-around items-center h-16 px-2">
        {tabs.map((tab) => {
          const active =
            tab.href === "/"
              ? pathname === "/"
              : pathname.startsWith(tab.href);
          const Icon = tab.icon;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 min-w-[56px] min-h-[44px] transition-all",
                active
                  ? "text-white"
                  : "text-gray-700 hover:text-gray-900"
              )}
            >
              <span
                className={cn(
                  "flex items-center justify-center rounded-full transition-all",
                  active
                    ? "bg-black text-white px-4 py-1.5"
                    : "px-2 py-1.5"
                )}
              >
                <Icon className="w-5 h-5" />
              </span>
              <span
                className={cn(
                  "text-[10px] font-medium",
                  active ? "text-black" : "text-gray-700"
                )}
              >
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
