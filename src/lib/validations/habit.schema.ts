import { z } from "zod";

export const createHabitSchema = z.object({
  name: z.string().trim().min(1, "El nombre es obligatorio"),
  emoji: z.string().min(1).max(8).default("✅"),
  active: z.boolean().default(true)
});

export const updateHabitSchema = createHabitSchema.partial();

export const createHabitLogSchema = z.object({
  habit_id: z.string().uuid(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/)
});

export type CreateHabitInput = z.infer<typeof createHabitSchema>;
export type UpdateHabitInput = z.infer<typeof updateHabitSchema>;
export type CreateHabitLogInput = z.infer<typeof createHabitLogSchema>;
