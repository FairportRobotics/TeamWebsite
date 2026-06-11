import { format, isSameDay } from "date-fns";

const friendlyMonthYearFormat = "MMMM yyyy";
const dateFormat = "M/dd/yyyy";
const timeFormat = "h:mmaaa";
const shorTimeFormat = "haaa";
const sortableDateFormat = "yyyy-MM-dd";

export function getDateString(date: Date) {
  return format(date, dateFormat);
}

export function getShortTimeString(date: Date) {
  if (date.getMinutes() === 0) return format(date, shorTimeFormat);
  else return format(date, timeFormat);
}

export function getTimeString(date: Date) {
  return format(date, timeFormat);
}

export function getDateTimeString(date: Date) {
  return format(date, `${dateFormat} ${timeFormat}`);
}

export function getSortableDateString(date: Date) {
  return format(date, sortableDateFormat);
}

export function getFriendlyMonthYearString(date: Date) {
  return format(date, friendlyMonthYearFormat);
}

export function getDateRangeParts(from: Date, to: Date) {
  if (isSameDay(from, to)) {
    return [format(from, dateFormat), format(from, timeFormat), format(to, timeFormat)];
  } else {
    return [format(from, dateFormat), format(from, timeFormat), format(to, dateFormat), format(to, timeFormat)];
  }
}

export function getDateRangeString(startDate: Date, endDate: Date) {
  // If start and end dates are the same, we do not need to repeate the date portion.
  if (isSameDay(startDate, endDate)) {
    return [`${format(startDate, dateFormat)}`, `${format(startDate, timeFormat)}`, `${format(endDate, timeFormat)}`];
  } else {
    return [
      `${format(startDate, dateFormat)}`,
      `${format(startDate, timeFormat)}`,
      `${format(endDate, dateFormat)}`,
      `${format(endDate, timeFormat)}`,
    ];
  }
}
