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

export function getDateRangeString(startDate: Date, endDate: Date) {
  // If start and end dates are the same, we do not need to repeate the date portion.
  if (isSameDay(startDate, endDate)) {
    return [
      `${format(startDate, "M/d/yy")}`,
      `${format(startDate, "h:MMaaaaa")}`,
      `${format(endDate, "h:MMaaaaa")}`,
    ];
  } else {
    return [
      `${format(startDate, "M/d/yy")}`,
      `${format(startDate, "h:MMaaaaa")}`,
      `${format(endDate, "M/d/yy")}`,
      `${format(endDate, "h:MMaaaaa")}`,
    ];
  }
}
