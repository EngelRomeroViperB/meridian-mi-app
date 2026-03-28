"use client";

import { Check, Pencil, Trash2 } from "lucide-react";

import { useLocale } from "@/lib/hooks/use-locale";
import { useSwipeComplete } from "@/lib/hooks/use-swipe-complete";
import { cn } from "@/lib/utils/classnames";
import type { Task, TaskPriority } from "@/lib/types/domain";

const PRIORITY_COLORS: Record<TaskPriority, string> = {
  high: "bg-red-500",
  medium: "bg-yellow-500",
  low: "bg-green-500"
};

interface TaskItemProps {
  task: Task;
  onToggle: (id: string, completed: boolean) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

export function TaskItem({ task, onToggle, onEdit, onDelete }: TaskItemProps) {
  const { t } = useLocale();

  const { onPointerDown, onPointerMove, onPointerUp, onPointerCancel, deltaX } =
    useSwipeComplete({
      onSwipeRight: () => onToggle(task.id, !task.completed),
      threshold: 80
    });

  const swipeProgress = Math.min(Math.max(deltaX / 80, 0), 1);
  const isSwipingRight = deltaX > 20;

  return (
    <div className="relative overflow-hidden rounded-2xl">
      {isSwipingRight && (
        <div
          className="absolute inset-0 flex items-center rounded-2xl bg-green-700/30 px-4 transition-opacity"
          style={{ opacity: swipeProgress }}
        >
          <Check size={20} className="text-green-400" />
        </div>
      )}

      <div
        className={cn(
          "relative flex items-center gap-3 rounded-2xl border border-zinc-800 bg-surface p-3.5 transition-transform select-none",
          task.completed && "opacity-50"
        )}
        style={{ transform: `translateX(${deltaX}px)` }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
      >
        <button
          onClick={() => onToggle(task.id, !task.completed)}
          aria-label={task.completed ? t("focus.markIncomplete") : t("focus.markComplete")}
          className={cn(
            "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition",
            task.completed
              ? "border-accent bg-accent text-white"
              : "border-zinc-600 hover:border-accent"
          )}
        >
          {task.completed && <Check size={12} strokeWidth={3} />}
        </button>

        <div className="min-w-0 flex-1">
          <p
            className={cn(
              "truncate text-sm font-medium",
              task.completed && "line-through text-zinc-500"
            )}
          >
            {task.title}
          </p>
          <div className="mt-0.5 flex items-center gap-2">
            <span className={cn("h-1.5 w-1.5 rounded-full", PRIORITY_COLORS[task.priority])} />
            {task.project && (
              <span className="truncate text-xs text-zinc-500">{task.project}</span>
            )}
            {task.dueDate && (
              <span className="text-xs text-zinc-500">
                {task.dueDate.slice(0, 10)}
              </span>
            )}
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-1">
          <button
            onClick={() => onEdit(task)}
            aria-label={t("focus.editTask")}
            className="rounded-lg p-1.5 text-zinc-500 transition hover:bg-zinc-700 hover:text-white"
          >
            <Pencil size={14} />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            aria-label={t("focus.deleteTask")}
            className="rounded-lg p-1.5 text-zinc-500 transition hover:bg-red-900/30 hover:text-red-400"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
