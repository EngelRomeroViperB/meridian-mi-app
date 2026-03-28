export type TaskPriority = "high" | "medium" | "low";
export type FinanceType = "income" | "expense";
export type FinanceChannel = string;

export interface TaskRow {
  id: string;
  user_id: string;
  title: string;
  project: string | null;
  priority: TaskPriority;
  due_date: string | null;
  completed: boolean;
  completed_at: string | null;
  created_at: string;
}

export interface FinanceRow {
  id: string;
  user_id: string;
  type: FinanceType;
  amount: number;
  project: string | null;
  channel: FinanceChannel | null;
  category: string | null;
  note: string | null;
  date: string;
  created_at: string;
}

export interface HabitRow {
  id: string;
  user_id: string;
  name: string;
  emoji: string;
  active: boolean;
  created_at: string;
}

export interface HabitLogRow {
  id: string;
  habit_id: string;
  user_id: string;
  date: string;
  created_at: string;
}
