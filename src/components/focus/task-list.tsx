"use client";

import { EmptyState } from "@/components/common/empty-state";
import { useLocale } from "@/lib/hooks/use-locale";
import type { Task } from "@/lib/types/domain";
import { TaskItem } from "./task-item";

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: string, completed: boolean) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  emptyTitle: string;
  emptyDescription?: string;
}

export function TaskList({ tasks, onToggle, onEdit, onDelete, emptyTitle, emptyDescription }: TaskListProps) {
  const { t } = useLocale();

  const pending = tasks.filter((t) => !t.completed);
  const completed = tasks.filter((t) => t.completed);

  if (tasks.length === 0) {
    return <EmptyState title={emptyTitle} description={emptyDescription} />;
  }

  return (
    <div className="flex flex-col gap-2">
      {pending.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}

      {completed.length > 0 && (
        <>
          <p className="mt-2 px-1 text-xs font-medium uppercase tracking-wider text-zinc-600">
            {t("focus.completed")} ({completed.length})
          </p>
          {completed.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={onToggle}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </>
      )}
    </div>
  );
}
