import type { CalendarListItem } from "@/lib/fn/calendar";
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns";
import { enUS } from "date-fns/locale";
import { ChevronLeft, ChevronRight, Ellipsis } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Card } from "./ui/card";

export interface CalendarDay {
  date: Date;
  day: number;
  month: number;
  year: number;
  isCurrentMonth: boolean;
  events: CalendarListItem[];
}

interface CalendarProps {
  initialMonth: Date;
  events: CalendarListItem[];
  onDateSelect?: (date: Date) => void;
}

function getDateRangeString(startDate: Date, endDate: Date) {
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

export function buildCalendarData(
  referenceDate: Date,
  events: CalendarListItem[],
): CalendarDay[][] {
  // 1. Define the visible range (includes padding days)
  const monthStart = startOfMonth(referenceDate);
  const monthEnd = endOfMonth(referenceDate);
  const startDate = startOfWeek(monthStart, { locale: enUS });
  const endDate = endOfWeek(monthEnd, { locale: enUS });

  // 2. Pre-index events by date string for O(1) lookup
  const eventsByDate = new Map<string, CalendarListItem[]>();
  for (const event of events) {
    const dateKey = format(new Date(event.startAt), "yyyy-MM-dd");
    if (!eventsByDate.has(dateKey)) eventsByDate.set(dateKey, []);
    eventsByDate.get(dateKey)!.push(event);
  }

  // 3. Generate all days in the visible range
  const allDays = eachDayOfInterval({ start: startDate, end: endDate });

  // 4. Group into weeks and attach events
  return allDays.reduce<CalendarDay[][]>((weeks, date, index) => {
    const weekIndex = Math.floor(index / 7);
    if (!weeks[weekIndex]) weeks[weekIndex] = [];

    const dateKey = format(date, "yyyy-MM-dd");
    const dayEvents = eventsByDate.get(dateKey) ?? [];

    weeks[weekIndex].push({
      date,
      day: date.getDate(),
      month: date.getMonth() + 1,
      year: date.getFullYear(),
      isCurrentMonth: isSameMonth(date, referenceDate),
      events: dayEvents,
    });

    return weeks;
  }, []);
}

export function EventCalendar({ initialMonth, events, onDateSelect }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(initialMonth);
  const calendarData = buildCalendarData(currentDate, events);

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const prevMonth = () => setCurrentDate((d) => subMonths(d, 1));
  const nextMonth = () => setCurrentDate((d) => addMonths(d, 1));

  return (
    <Card>
      <div className="">
        {/* Month Navigation Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={prevMonth}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            aria-label="Previous month"
          >
            <ChevronLeft />
          </button>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            {format(currentDate, "MMMM yyyy")}
          </h2>
          <button
            onClick={nextMonth}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            aria-label="Next month"
          >
            <ChevronRight />
          </button>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-px bg-gray-200 dark:bg-gray-800">
          {/* Weekday Headers */}
          {weekDays.map((day) => (
            <div
              key={day}
              className="bg-gray-50 dark:bg-gray-800 text-center text-xs font-medium text-gray-500 dark:text-gray-400 py-2"
            >
              {day}
            </div>
          ))}

          {/* Days */}
          {calendarData.map((week, weekIdx) => (
            <div key={weekIdx} className="contents">
              {week.map((day, dayIdx) => (
                <div
                  key={dayIdx}
                  onClick={() => onDateSelect?.(day.date)}
                  className={`
                  focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-offset-1 dark:focus:ring-offset-gray-900
                  relative flex flex-col items-center justify-start p-2 min-h-16 cursor-pointer
                  select-none transition-colors duration-150
                  ${
                    day.isCurrentMonth
                      ? "bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 hover:bg-blue-50 dark:hover:bg-gray-800"
                      : "bg-gray-50 dark:bg-gray-800 text-gray-400 dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }
                  ${day.events.length > 0 ? "ring-1 ring-inset ring-blue-200 dark:ring-blue-700" : ""}
                  ${isSameDay(day.date, new Date()) ? "border-orange-400" : ""}
                `}
                  data-date={format(day.date, "yyyy-MM-dd")}
                >
                  <span
                    className={`text-sm font-medium w-full ${isSameDay(day.date, new Date()) ? "bg-blue-900" : ""}`}
                  >
                    {day.day}
                  </span>

                  {/* Events */}
                  <div className="mt-1 w-full flex flex-col gap-0.5">
                    {day.events.map((event) => (
                      <CalendarItem item={event} key={event.id} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

function CalendarDay() {
  return <></>;
}

/**
 * Emits a single Calendar event.
 * @param {item} CalendarListItem
 * @returns DOM representing the basics of a Calendar event.
 */
function CalendarItem({ item }: { item: CalendarListItem }): ReactNode {
  const [state, setState] = useState<"expanded" | "collapsed">("collapsed");
  const dateParts = getDateRangeString(item.startAt, item.endAt);

  function toggleState() {
    setState((prev) => (prev === "expanded" ? "collapsed" : "expanded"));
  }

  return (
    <div className="border border-amber-600 rounded-sm overflow-hidden">
      <div className="flex flex-row items-center justify-between bg-amber-600 p-1">
        <div className="line-clamp-1 font-semibold">{item.title}</div>
        <div>
          <Ellipsis onClick={() => toggleState()} />
        </div>
      </div>

      {state === "expanded" && (
        <div className="p-1">
          {item.location && (
            <div className="line-clamp-1 text-sm text-muted">@ {item.location}</div>
          )}

          {/* Dates */}
          <div className="text-sm text-muted mt-2">
            {dateParts.length === 3 ? (
              <div className="flex flex-row items-center justify-between">
                <div>{dateParts[0]}</div>
                <div>
                  {dateParts[1]} - {dateParts[2]}
                </div>
              </div>
            ) : (
              <>
                <div>
                  {dateParts[0]} {dateParts[1]}
                </div>
                <div>
                  {dateParts[2]} {dateParts[3]}
                </div>
              </>
            )}
          </div>

          {/* Information and signup links */}
          <div className="flex flex-row items-center justify-between">
            <div>
              {item.informationLink && (
                <div>
                  <a href={item.informationLink} target="_blank" className="underline">
                    Info
                  </a>
                </div>
              )}
            </div>
            <div>
              {item.signupLink && (
                <div>
                  <a href={item.signupLink} target="_blank" className="underline">
                    Signup
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
