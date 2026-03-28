"use client";

import { BarChart2, Flame, LogOut, Wallet } from "lucide-react";

import { LanguageSwitcher } from "@/components/common/language-switcher";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { useLocale } from "@/lib/hooks/use-locale";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils/classnames";

const NAV_ITEMS = [
  { href: "/dashboard", icon: BarChart2, labelKey: "nav.dashboard" },
  { href: "/money", icon: Wallet, labelKey: "nav.money" },
  { href: "/streak", icon: Flame, labelKey: "nav.streak" }
] as const;

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { t } = useLocale();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <aside className="hidden lg:flex lg:w-60 lg:flex-col lg:border-r lg:border-zinc-800 lg:bg-surface">
      <div className="flex h-16 shrink-0 items-center border-b border-zinc-800 px-6">
        <span className="text-lg font-semibold tracking-tight text-white">Meridian</span>
      </div>

      <nav className="flex flex-1 flex-col gap-1 p-4">
        {NAV_ITEMS.map(({ href, icon: Icon, labelKey }) => {
          const isActive = pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition",
                isActive
                  ? "bg-accent/10 font-medium text-accent"
                  : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
              )}
            >
              <Icon size={18} strokeWidth={isActive ? 2.2 : 1.8} />
              {t(labelKey)}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-zinc-800 p-4 flex flex-col gap-2">
        <div className="flex items-center justify-between px-3 py-1">
          <span className="text-xs text-zinc-500">Idioma / Language</span>
          <LanguageSwitcher />
        </div>
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
        >
          <LogOut size={18} />
          {t("auth.logout")}
        </button>
      </div>
    </aside>
  );
}
