"use client";

import { useLocale } from "@/lib/hooks/use-locale";
import { formatCurrency } from "@/lib/utils/number";
import { cn } from "@/lib/utils/classnames";
import type { DashboardStats } from "@/lib/db/queries/dashboard";

interface KpiCardsProps {
  stats: DashboardStats;
}

export function KpiCards({ stats }: KpiCardsProps) {
  const { t } = useLocale();

  const net = stats.monthIncome - stats.monthExpense;

  const cards = [
    {
      label: t("dashboard.totalIncome"),
      value: formatCurrency(stats.monthIncome),
      sub: t("dashboard.month"),
      color: "text-green-400",
      bar: null
    },
    {
      label: t("dashboard.netBalance"),
      value: formatCurrency(net),
      sub: `${formatCurrency(stats.monthExpense)} ${t("dashboard.totalExpense").toLowerCase()}`,
      color: net >= 0 ? "text-green-400" : "text-red-400",
      bar: null
    },
    {
      label: t("dashboard.habitConsistency"),
      value: `${stats.weekHabitConsistency}%`,
      sub: t("dashboard.week"),
      color: "text-orange-400",
      bar: stats.weekHabitConsistency
    }
  ];

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {cards.map(({ label, value, sub, color, bar }) => (
        <div key={label} className="rounded-2xl border border-zinc-800 bg-surface p-4">
          <p className="mb-1 text-xs font-medium text-zinc-500">{label}</p>
          <p className={cn("text-2xl font-bold", color)}>{value}</p>
          <p className="mt-1 text-xs text-zinc-500">{sub}</p>
          {bar !== null && (
            <div className="mt-3 h-1 w-full rounded-full bg-zinc-800">
              <div
                className="h-1 rounded-full bg-accent transition-all duration-700"
                style={{ width: `${bar}%` }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
