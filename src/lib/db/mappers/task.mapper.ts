import type { TaskRow } from "@/lib/types/database";
import type { Task } from "@/lib/types/domain";

export function mapTaskRowToTask(row: TaskRow): Task {
  return {
    id: row.id,
    userId: row.user_id,
    title: row.title,
    project: row.project,
    priority: row.priority,
    dueDate: row.due_date,
    completed: row.completed,
    completedAt: row.completed_at,
    createdAt: row.created_at
  };
}
