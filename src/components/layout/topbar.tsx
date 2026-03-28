"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

import { LanguageSwitcher } from "@/components/common/language-switcher";
import { useLocale } from "@/lib/hooks/use-locale";
import { createClient } from "@/lib/supabase/client";

interface TopbarProps {
  title?: string;
}

export function Topbar({ title }: TopbarProps) {
  const { t } = useLocale();
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center justify-between border-b border-zinc-800 bg-background/80 px-4 backdrop-blur lg:hidden">
      <span className="text-base font-semibold">{title ?? "Meridian"}</span>
      <div className="flex items-center gap-2">
        <LanguageSwitcher />
        <button
          onClick={handleLogout}
          aria-label={t("auth.logout")}
          className="rounded-lg p-1.5 text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
        >
          <LogOut size={18} />
        </button>
      </div>
    </header>
  );
}
