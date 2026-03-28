"use client";

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, Legend } from "recharts";

import { useLocale } from "@/lib/hooks/use-locale";
import type { DashboardStats } from "@/lib/db/queries/dashboard";

interface FinancesChartProps {
  data: DashboardStats["financeTrend"];
}

export function FinancesChart({ data }: FinancesChartProps) {
  const { t } = useLocale();

  if (data.length === 0) {
    return (
      <div className="flex h-32 items-center justify-center rounded-2xl border border-zinc-800 bg-surface">
        <p className="text-sm text-zinc-500">{t("dashboard.noData")}</p>
      </div>
    );
  }

  const formatted = data.map((d) => ({
    ...d,
    date: d.date.slice(5)
  }));

  return (
    <div className="rounded-2xl border border-zinc-800 bg-surface p-4">
      <p className="mb-4 text-sm font-medium text-zinc-300">{t("dashboard.month")}</p>
      <ResponsiveContainer width="100%" height={140}>
        <LineChart data={formatted}>
          <XAxis
            dataKey="date"
            tick={{ fontSize: 10, fill: "#71717a" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{ background: "#1a1a1a", border: "1px solid #27272a", borderRadius: 8 }}
            labelStyle={{ color: "#a1a1aa", fontSize: 11 }}
            itemStyle={{ fontSize: 11 }}
          />
          <Legend wrapperStyle={{ fontSize: 11, color: "#71717a" }} />
          <Line
            type="monotone"
            dataKey="income"
            stroke="#4ade80"
            strokeWidth={2}
            dot={false}
            name={t("money.income")}
          />
          <Line
            type="monotone"
            dataKey="expense"
            stroke="#f87171"
            strokeWidth={2}
            dot={false}
            name={t("money.expense")}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
