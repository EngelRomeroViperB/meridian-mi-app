"use client";

import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { ErrorState } from "@/components/common/error-state";
import { LoadingState } from "@/components/common/loading-state";
import { ProjectSummary } from "@/components/money/project-summary";
import { useLocale } from "@/lib/hooks/use-locale";
import { mapFinanceRowToFinance } from "@/lib/db/mappers/finance.mapper";
import type { Finance } from "@/lib/types/domain";
import type { FinanceRow } from "@/lib/types/database";
import type { ApiResponse } from "@/lib/types/api";

async function apiFetch<T>(url: string): Promise<T> {
  const res = await fetch(url);
  const json = (await res.json()) as ApiResponse<T>;
  if (json.error) throw new Error(json.error);
  return json.data as T;
}

export default function MoneyProjectsPage() {
  const { t } = useLocale();

  const { data: finances = [], isLoading, isError, refetch } = useQuery<Finance[]>({
    queryKey: ["finances"],
    queryFn: async () => {
      const rows = await apiFetch<FinanceRow[]>("/api/finances");
      return rows.map(mapFinanceRowToFinance);
    }
  });

  return (
    <div className="mx-auto max-w-lg px-4 py-6">
      <div className="mb-6 flex items-center gap-3">
        <Link
          href="/money"
          className="rounded-xl border border-zinc-800 p-2 text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
        >
          <ArrowLeft size={18} />
        </Link>
        <h1 className="text-xl font-semibold">{t("money.projects")}</h1>
      </div>

      {isLoading ? (
        <LoadingState />
      ) : isError ? (
        <ErrorState onRetry={() => void refetch()} />
      ) : (
        <ProjectSummary finances={finances} />
      )}
    </div>
  );
}
