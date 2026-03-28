"use client";

import { BarChart2, Flame, Wallet } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useLocale } from "@/lib/hooks/use-locale";
import { cn } from "@/lib/utils/classnames";

const NAV_ITEMS = [
  { href: "/dashboard", icon: BarChart2, labelKey: "nav.dashboard" },
  { href: "/money", icon: Wallet, labelKey: "nav.money" },
  { href: "/streak", icon: Flame, labelKey: "nav.streak" }
] as const;

export function BottomNav() {
  const pathname = usePathname();
  const { t } = useLocale();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-zinc-800 bg-surface lg:hidden">
      <ul className="flex h-16 items-center justify-around px-2">
        {NAV_ITEMS.map(({ href, icon: Icon, labelKey }) => {
          const isActive = pathname.startsWith(href);
          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                className={cn(
                  "flex flex-col items-center gap-0.5 py-2 text-xs transition",
                  isActive ? "text-accent" : "text-zinc-500 hover:text-zinc-300"
                )}
              >
                <Icon size={20} strokeWidth={isActive ? 2.2 : 1.8} />
                <span>{t(labelKey)}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
