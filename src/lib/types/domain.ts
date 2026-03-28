export type TaskPriority = "high" | "medium" | "low";
export type FinanceType = "income" | "expense";
export type FinanceChannel = string;

export interface Task {
  id: string;
  userId: string;
  title: string;
  project: string | null;
  priority: TaskPriority;
  dueDate: string | null;
  completed: boolean;
  completedAt: string | null;
  createdAt: string;
}

export interface Finance {
  id: string;
  userId: string;
  type: FinanceType;
  amount: number;
  project: string | null;
  channel: FinanceChannel | null;
  category: string | null;
  note: string | null;
  date: string;
  createdAt: string;
}

export interface Habit {
  id: string;
  userId: string;
  name: string;
  emoji: string;
  active: boolean;
  createdAt: string;
  logs?: string[];
}

export interface HabitLog {
  id: string;
  habitId: string;
  userId: string;
  date: string;
  createdAt: string;
}
