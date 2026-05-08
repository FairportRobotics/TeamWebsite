import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { format, isSameDay } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getDateRangeParts(from: Date, to: Date) {
  const dateFormat = "MM/dd/yyyy";
  const timeFormat = "h:mmaaa";

  if (isSameDay(from, to)) {
    return [format(from, dateFormat), format(from, timeFormat), format(to, timeFormat)];
  } else {
    return [
      format(from, dateFormat),
      format(from, timeFormat),
      format(to, dateFormat),
      format(to, timeFormat),
    ];
  }
}
