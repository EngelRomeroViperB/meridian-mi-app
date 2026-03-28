"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { useLocale } from "@/lib/hooks/use-locale";
import { cn } from "@/lib/utils/classnames";
import { createTaskSchema, type CreateTaskInput } from "@/lib/validations/task.schema";
import type { Task } from "@/lib/types/domain";

interface TaskFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: CreateTaskInput) => Promise<void>;
  initialData?: Task | null;
  isLoading?: boolean;
}

export function TaskForm({ open, onClose, onSubmit, initialData, isLoading }: TaskFormProps) {
  const { t } = useLocale();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<CreateTaskInput>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: { priority: "medium" }
  });

  useEffect(() => {
    if (open && initialData) {
      reset({
        title: initialData.title,
        project: initialData.project ?? "",
        priority: initialData.priority,
        due_date: initialData.dueDate ?? ""
      });
    } else if (open) {
      reset({ title: "", project: "", priority: "medium", due_date: "" });
    }
  }, [open, initialData, reset]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 px-4 pb-6 lg:items-center lg:pb-0">
      <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-surface p-5 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-semibold">
            {initialData ? t("focus.editTask") : t("focus.addTask")}
          </h2>
          <button onClick={onClose} className="rounded-lg p-1 text-zinc-500 hover:text-white">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-zinc-300">{t("focus.taskTitle")}</label>
            <input
              type="text"
              placeholder={t("focus.taskTitle")}
              className="w-full rounded-xl border border-zinc-700 bg-background px-3 py-2.5 text-sm placeholder:text-zinc-500 focus:border-accent focus:outline-none"
              {...register("title")}
            />
            {errors.title && <p className="text-xs text-red-400">{errors.title.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-zinc-300">{t("focus.project")}</label>
              <input
                type="text"
                placeholder={t("common.optional")}
                className="w-full rounded-xl border border-zinc-700 bg-background px-3 py-2.5 text-sm placeholder:text-zinc-500 focus:border-accent focus:outline-none"
                {...register("project")}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-zinc-300">{t("focus.priority")}</label>
              <select
                className="w-full rounded-xl border border-zinc-700 bg-background px-3 py-2.5 text-sm text-white focus:border-accent focus:outline-none"
                {...register("priority")}
              >
                <option value="high">{t("focus.priorityHigh")}</option>
                <option value="medium">{t("focus.priorityMedium")}</option>
                <option value="low">{t("focus.priorityLow")}</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-zinc-300">{t("focus.dueDate")}</label>
            <input
              type="date"
              className="w-full rounded-xl border border-zinc-700 bg-background px-3 py-2.5 text-sm text-white focus:border-accent focus:outline-none"
              {...register("due_date")}
            />
          </div>

          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl border border-zinc-700 py-2.5 text-sm text-zinc-300 transition hover:bg-zinc-800"
            >
              {t("common.cancel")}
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className={cn(
                "flex-1 rounded-xl bg-accent py-2.5 text-sm font-medium text-white transition hover:opacity-90",
                "disabled:cursor-not-allowed disabled:opacity-60"
              )}
            >
              {isLoading ? t("common.loading") : t("common.save")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
