"use client";

import { useLocale } from "@/lib/hooks/use-locale";
import type { Task } from "@/lib/types/domain";

interface TodayStripProps {
  tasks: Task[];
}

export function TodayStrip({ tasks }: TodayStripProps) {
  const { t, locale } = useLocale();

  const total = tasks.length;
  const completed = tasks.filter((tk) => tk.completed).length;
  const pending = total - completed;
  const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="rounded-2xl border border-zinc-800 bg-surface p-4">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm font-medium text-zinc-300">{t("focus.today")}</p>
        <p className="text-xs text-zinc-500">
          {completed}/{total}
        </p>
      </div>

      <div className="mb-3 h-1.5 w-full rounded-full bg-zinc-800">
        <div
          className="h-1.5 rounded-full bg-accent transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex gap-4 text-xs text-zinc-500">
        <span>
          <span className="font-semibold text-white">{pending}</span>{" "}
          {locale === "es" ? "pendientes" : "pending"}
        </span>
        <span>
          <span className="font-semibold text-green-400">{completed}</span>{" "}
          {t("focus.completed").toLowerCase()}
        </span>
      </div>
    </div>
  );
}
