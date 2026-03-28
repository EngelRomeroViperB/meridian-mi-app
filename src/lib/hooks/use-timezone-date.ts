"use client";

import { useMemo } from "react";

import { getTodayStringBogota, formatDisplayDate, isTodayBogota } from "@/lib/utils/date";

export function useTimezoneDate() {
  const today = useMemo(() => getTodayStringBogota(), []);

  return {
    today,
    formatDate: formatDisplayDate,
    isToday: isTodayBogota
  };
}
