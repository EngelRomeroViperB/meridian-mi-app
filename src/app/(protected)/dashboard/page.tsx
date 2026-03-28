"use client";

import { useQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";

import { ErrorState } from "@/components/common/error-state";
import { LoadingState } from "@/components/common/loading-state";
import { KpiCards } from "@/components/dashboard/kpi-cards";
import { useLocale } from "@/lib/hooks/use-locale";
import type { DashboardStats } from "@/lib/db/queries/dashboard";
import type { ApiResponse } from "@/lib/types/api";

const FinancesChart = dynamic(
  () => import("@/components/dashboard/finances-chart").then((m) => m.FinancesChart),
  { ssr: false }
);

async function fetchStats(): Promise<DashboardStats> {
  const res = await fetch("/api/dashboard");
  const json = (await res.json()) as ApiResponse<DashboardStats>;
  if (json.error) throw new Error(json.error);
  return json.data as DashboardStats;
}

export default function DashboardPage() {
  const { t } = useLocale();

  const { data: stats, isLoading, isError, refetch } = useQuery<DashboardStats>({
    queryKey: ["dashboard"],
    queryFn: fetchStats
  });

  return (
    <div className="mx-auto max-w-lg px-4 py-6">
      <h1 className="mb-6 text-xl font-semibold">{t("dashboard.title")}</h1>

      {isLoading ? (
        <LoadingState />
      ) : isError ? (
        <ErrorState onRetry={() => void refetch()} />
      ) : stats ? (
        <div className="flex flex-col gap-5">
          <KpiCards stats={stats} />
          <FinancesChart data={stats.financeTrend} />
        </div>
      ) : null}
    </div>
  );
}
