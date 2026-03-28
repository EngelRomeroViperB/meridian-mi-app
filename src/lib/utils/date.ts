import { format, subDays, parseISO, isToday } from "date-fns";
import { toZonedTime } from "date-fns-tz";

const TZ = "America/Bogota";

export function getBogotaNow(): Date {
  return toZonedTime(new Date(), TZ);
}

export function getTodayStringBogota(): string {
  return format(getBogotaNow(), "yyyy-MM-dd");
}

export function getYesterdayStringBogota(): string {
  return format(subDays(getBogotaNow(), 1), "yyyy-MM-dd");
}

export function isTodayBogota(dateStr: string): boolean {
  const zoned = toZonedTime(parseISO(dateStr + "T00:00:00"), TZ);
  const today = getBogotaNow();
  return format(zoned, "yyyy-MM-dd") === format(today, "yyyy-MM-dd");
}

export function formatDisplayDate(dateStr: string): string {
  return format(parseISO(dateStr), "dd MMM yyyy");
}

export function subtractDays(dateStr: string, n: number): string {
  return format(subDays(parseISO(dateStr), n), "yyyy-MM-dd");
}

export function dateISOToday(): string {
  return new Date().toISOString().split("T")[0] ?? "";
}

export function isDateToday(date: string | null | undefined): boolean {
  if (!date) return false;
  try {
    return isToday(parseISO(date));
  } catch {
    return false;
  }
}
