"use client";

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";

import { useLocale } from "@/lib/hooks/use-locale";

interface TaskTrendPoint {
  date: string;
  completed: number;
}

interface TasksChartProps {
  data: TaskTrendPoint[];
}

export function TasksChart({ data }: TasksChartProps) {
  const { t } = useLocale();

  if (data.length === 0) {
    return (
      <div className="flex h-32 items-center justify-center rounded-2xl border border-zinc-800 bg-surface">
        <p className="text-sm text-zinc-500">{t("dashboard.noData")}</p>
      </div>
    );
  }

  const formatted = data.map((d: TaskTrendPoint) => ({
    ...d,
    date: d.date.slice(5)
  }));

  return (
    <div className="rounded-2xl border border-zinc-800 bg-surface p-4">
      <p className="mb-4 text-sm font-medium text-zinc-300">{t("dashboard.completedTasks")}</p>
      <ResponsiveContainer width="100%" height={120}>
        <BarChart data={formatted} barSize={12}>
          <XAxis
            dataKey="date"
            tick={{ fontSize: 10, fill: "#71717a" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{ background: "#1a1a1a", border: "1px solid #27272a", borderRadius: 8 }}
            labelStyle={{ color: "#a1a1aa", fontSize: 11 }}
            itemStyle={{ color: "#6366f1", fontSize: 11 }}
          />
          <Bar dataKey="completed" fill="#6366f1" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
