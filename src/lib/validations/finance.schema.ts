import { z } from "zod";

const optionalText = z
  .string()
  .trim()
  .max(60)
  .optional()
  .nullable()
  .transform((value) => {
    if (!value) return null;
    return value;
  });

export const createFinanceSchema = z.object({
  type: z.enum(["income", "expense"]),
  amount: z.number().positive("El monto debe ser mayor a 0"),
  project: optionalText,
  channel: optionalText,
  category: z.string().trim().max(60).optional().nullable().transform((value) => (value ? value : null)),
  note: z.string().trim().max(240).optional().nullable().transform((value) => (value ? value : null)),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Formato de fecha inválido")
});

export const updateFinanceSchema = createFinanceSchema.partial();

export type CreateFinanceInput = z.infer<typeof createFinanceSchema>;
export type UpdateFinanceInput = z.infer<typeof updateFinanceSchema>;
