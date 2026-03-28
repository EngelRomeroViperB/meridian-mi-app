"use client";

import { useLocale } from "@/lib/hooks/use-locale";
import { formatCurrency } from "@/lib/utils/number";
import { cn } from "@/lib/utils/classnames";
import type { Finance } from "@/lib/types/domain";

interface ProjectSummaryProps {
  finances: Finance[];
}

interface ProjectStats {
  name: string;
  income: number;
  expense: number;
}

export function ProjectSummary({ finances }: ProjectSummaryProps) {
  const { t } = useLocale();

  const projectMap = new Map<string, ProjectStats>();

  for (const f of finances) {
    const key = f.project ?? t("money.allProjects");
    const current = projectMap.get(key) ?? { name: key, income: 0, expense: 0 };
    if (f.type === "income") current.income += f.amount;
    else current.expense += f.amount;
    projectMap.set(key, current);
  }

  const projects = Array.from(projectMap.values()).sort(
    (a, b) => b.income + b.expense - (a.income + a.expense)
  );

  if (projects.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-2">
      {projects.map((p) => {
        const net = p.income - p.expense;
        return (
          <div key={p.name} className="rounded-2xl border border-zinc-800 bg-surface p-4">
            <div className="mb-3 flex items-center justify-between">
              <p className="font-medium text-sm">{p.name}</p>
              <span
                className={cn(
                  "text-sm font-semibold",
                  net >= 0 ? "text-green-400" : "text-red-400"
                )}
              >
                {net >= 0 ? "+" : ""}{formatCurrency(net)}
              </span>
            </div>
            <div className="flex gap-4 text-xs text-zinc-500">
              <span>
                <span className="font-medium text-green-400">{formatCurrency(p.income)}</span>{" "}
                {t("money.income").toLowerCase()}
              </span>
              <span>
                <span className="font-medium text-red-400">{formatCurrency(p.expense)}</span>{" "}
                {t("money.expense").toLowerCase()}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
