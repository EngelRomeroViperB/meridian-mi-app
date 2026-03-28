import type { FinanceRow } from "@/lib/types/database";
import type { Finance } from "@/lib/types/domain";

export function mapFinanceRowToFinance(row: FinanceRow): Finance {
  return {
    id: row.id,
    userId: row.user_id,
    type: row.type,
    amount: Number(row.amount),
    project: row.project,
    channel: row.channel,
    category: row.category,
    note: row.note,
    date: row.date,
    createdAt: row.created_at
  };
}
