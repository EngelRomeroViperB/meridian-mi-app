"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { useLocale } from "@/lib/hooks/use-locale";
import { cn } from "@/lib/utils/classnames";
import { createFinanceSchema, type CreateFinanceInput } from "@/lib/validations/finance.schema";
import type { Finance } from "@/lib/types/domain";
import { getTodayStringBogota } from "@/lib/utils/date";

interface FinanceFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: CreateFinanceInput) => Promise<void>;
  initialData?: Finance | null;
  projectOptions?: string[];
  channelOptions?: string[];
  isLoading?: boolean;
}

export function FinanceForm({
  open,
  onClose,
  onSubmit,
  initialData,
  projectOptions = [],
  channelOptions = [],
  isLoading
}: FinanceFormProps) {
  const { t } = useLocale();

  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm<CreateFinanceInput>({
    resolver: zodResolver(createFinanceSchema),
    defaultValues: { type: "income", date: getTodayStringBogota() }
  });

  const type = watch("type");

  useEffect(() => {
    if (open && initialData) {
      reset({
        type: initialData.type,
        amount: initialData.amount,
        project: initialData.project ?? "",
        channel: initialData.channel ?? undefined,
        category: initialData.category ?? "",
        note: initialData.note ?? "",
        date: initialData.date
      });
    } else if (open) {
      reset({ type: "income", amount: 0, date: getTodayStringBogota() });
    }
  }, [open, initialData, reset]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 px-4 pb-6 lg:items-center lg:pb-0">
      <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-surface p-5 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-semibold">
            {initialData ? t("money.editTransaction") : t("money.addTransaction")}
          </h2>
          <button onClick={onClose} className="rounded-lg p-1 text-zinc-500 hover:text-white">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex gap-1 rounded-xl border border-zinc-700 bg-background p-1">
            {(["income", "expense"] as const).map((tp) => (
              <label
                key={tp}
                className={cn(
                  "flex flex-1 cursor-pointer items-center justify-center rounded-lg py-2 text-sm font-medium transition",
                  type === tp
                    ? tp === "income"
                      ? "bg-green-700 text-white"
                      : "bg-red-700 text-white"
                    : "text-zinc-400 hover:text-white"
                )}
              >
                <input type="radio" value={tp} className="sr-only" {...register("type")} />
                {tp === "income" ? t("money.income") : t("money.expense")}
              </label>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-zinc-300">{t("money.amount")}</label>
              <input
                type="number"
                step="0.01"
                min="0"
                className="w-full rounded-xl border border-zinc-700 bg-background px-3 py-2.5 text-sm focus:border-accent focus:outline-none"
                {...register("amount", { valueAsNumber: true })}
              />
              {errors.amount && <p className="text-xs text-red-400">{errors.amount.message}</p>}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-zinc-300">{t("money.date")}</label>
              <input
                type="date"
                className="w-full rounded-xl border border-zinc-700 bg-background px-3 py-2.5 text-sm text-white focus:border-accent focus:outline-none"
                {...register("date")}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-zinc-300">{t("money.project")}</label>
              <input
                type="text"
                placeholder={t("common.optional")}
                list="money-project-options"
                className="w-full rounded-xl border border-zinc-700 bg-background px-3 py-2.5 text-sm placeholder:text-zinc-500 focus:border-accent focus:outline-none"
                {...register("project")}
              />
              <datalist id="money-project-options">
                {projectOptions.map((project) => (
                  <option key={project} value={project} />
                ))}
              </datalist>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-zinc-300">{t("money.channel")}</label>
              <input
                type="text"
                list="money-channel-options"
                placeholder={t("common.optional")}
                className="w-full rounded-xl border border-zinc-700 bg-background px-3 py-2.5 text-sm text-white focus:border-accent focus:outline-none"
                {...register("channel")}
              />
              <datalist id="money-channel-options">
                {channelOptions.map((channel) => (
                  <option key={channel} value={channel} />
                ))}
              </datalist>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-zinc-300">{t("money.note")}</label>
            <input
              type="text"
              placeholder={t("common.optional")}
              className="w-full rounded-xl border border-zinc-700 bg-background px-3 py-2.5 text-sm placeholder:text-zinc-500 focus:border-accent focus:outline-none"
              {...register("note")}
            />
          </div>

          <div className="flex gap-3 pt-1">
            <button type="button" onClick={onClose} className="flex-1 rounded-xl border border-zinc-700 py-2.5 text-sm text-zinc-300 hover:bg-zinc-800">
              {t("common.cancel")}
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 rounded-xl bg-accent py-2.5 text-sm font-medium text-white hover:opacity-90 disabled:opacity-60"
            >
              {isLoading ? t("common.loading") : t("common.save")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
