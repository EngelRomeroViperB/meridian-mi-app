"use client";

import { Pencil, Trash2 } from "lucide-react";

import { EmptyState } from "@/components/common/empty-state";
import { useLocale } from "@/lib/hooks/use-locale";
import { formatCurrency } from "@/lib/utils/number";
import { cn } from "@/lib/utils/classnames";
import type { Finance } from "@/lib/types/domain";

interface FinanceListProps {
  finances: Finance[];
  onEdit: (f: Finance) => void;
  onDelete: (id: string) => void;
}

export function FinanceList({ finances, onEdit, onDelete }: FinanceListProps) {
  const { t } = useLocale();

  if (finances.length === 0) {
    return (
      <EmptyState
        title={t("money.noTransactions")}
        description={t("money.noTransactionsDesc")}
      />
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {finances.map((f) => (
        <div
          key={f.id}
          className="flex items-center gap-3 rounded-2xl border border-zinc-800 bg-surface p-3.5"
        >
          <div
            className={cn(
              "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-bold",
              f.type === "income"
                ? "bg-green-900/40 text-green-400"
                : "bg-red-900/40 text-red-400"
            )}
          >
            {f.type === "income" ? "+" : "-"}
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">
              {formatCurrency(f.amount)}
            </p>
            <div className="mt-0.5 flex items-center gap-2 text-xs text-zinc-500">
              {f.project && <span className="truncate">{f.project}</span>}
              {f.channel && <span>· {f.channel}</span>}
              <span>· {f.date}</span>
            </div>
            {f.note && (
              <p className="mt-0.5 truncate text-xs text-zinc-500">{f.note}</p>
            )}
          </div>

          <div className="flex shrink-0 items-center gap-1">
            <button
              onClick={() => onEdit(f)}
              className="rounded-lg p-1.5 text-zinc-500 hover:bg-zinc-700 hover:text-white"
            >
              <Pencil size={14} />
            </button>
            <button
              onClick={() => onDelete(f.id)}
              className="rounded-lg p-1.5 text-zinc-500 hover:bg-red-900/30 hover:text-red-400"
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
