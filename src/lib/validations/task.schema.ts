import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string().trim().min(1, "El título es obligatorio"),
  project: z.string().trim().optional().nullable(),
  priority: z.enum(["high", "medium", "low"]).default("medium"),
  due_date: z.string().nullable().optional()
});

export const updateTaskSchema = createTaskSchema.partial().extend({
  completed: z.boolean().optional()
});

export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;
