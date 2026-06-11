import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn, getDateRangeString, getFriendlyMonthYearString, getSortableDateString } from "@/lib/utils";
import type { EventListItem } from "@/server/functions/calendar/getPublishedEventList";
import { Link } from "@tanstack/react-router";
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns";
import { enUS } from "date-fns/locale";
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp } from "lucide-react";
import { useState, type ReactNode } from "react";

export interface CalendarDay {
  date: Date;
  day: number;
  month: number;
  year: number;
  isCurrentMonth: boolean;
  events: EventListItem[];
}

interface CalendarProps {
  initialMonth: Date;
  events: EventListItem[];
  onDateSelect?: (date: Date) => void;
}

export function buildCalendarData(referenceDate: Date, events: EventListItem[]): CalendarDay[][] {
  // 1. Define the visible range (includes padding days)
  const monthStart = startOfMonth(referenceDate);
  const monthEnd = endOfMonth(referenceDate);
  const startDate = startOfWeek(monthStart, { locale: enUS });
  const endDate = endOfWeek(monthEnd, { locale: enUS });

  // 2. Pre-index events by date string for O(1) lookup
  const eventsByDate = new Map<string, EventListItem[]>();
  for (const event of events) {
    const dateKey = getSortableDateString(new Date(event.startAt));
    if (!eventsByDate.has(dateKey)) eventsByDate.set(dateKey, []);
    eventsByDate.get(dateKey)!.push(event);
  }

  // 3. Generate all days in the visible range
  const allDays = eachDayOfInterval({ start: startDate, end: endDate });

  // 4. Group into weeks and attach events
  return allDays.reduce<CalendarDay[][]>((weeks, date, index) => {
    const weekIndex = Math.floor(index / 7);
    if (!weeks[weekIndex]) weeks[weekIndex] = [];

    const dateKey = getSortableDateString(date);
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
      <MonthHeader currentDate={currentDate} prevMonth={prevMonth} nextMonth={nextMonth} />
      <CalendarGrid weekDays={weekDays} calendarData={calendarData} />
    </Card>
  );
}

function MonthHeader({
  currentDate,
  prevMonth,
  nextMonth,
}: {
  currentDate: Date;
  prevMonth: () => void;
  nextMonth: () => void;
}) {
  return (
    <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700">
      <button
        onClick={prevMonth}
        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
        aria-label="Previous month"
      >
        <ChevronLeft />
      </button>
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
        {getFriendlyMonthYearString(currentDate)}
      </h2>
      <button
        onClick={nextMonth}
        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
        aria-label="Next month"
      >
        <ChevronRight />
      </button>
    </div>
  );
}

function CalendarGrid({ weekDays, calendarData }: { weekDays: string[]; calendarData: CalendarDay[][] }) {
  return (
    <div className="grid grid-cols-7 gap-px">
      {/* Weekday Headers */}
      {weekDays.map((day) => (
        <WeekdayHeader day={day} key={day} />
      ))}

      {/* Days */}
      {calendarData.map((week, weekIndex) => (
        <CalendarWeek week={week} weekIndex={weekIndex} key={weekIndex} />
      ))}
    </div>
  );
}

function WeekdayHeader({ day }: { day: string }) {
  return (
    <div key={day} className=" dark:bg-gray-800 text-center text-xs font-medium text-gray-500 py-2">
      {day}
    </div>
  );
}

function CalendarWeek({ week, weekIndex }: { week: CalendarDay[]; weekIndex: number }): ReactNode {
  return (
    <div className="contents" key={weekIndex} data-week-index={weekIndex}>
      {week.map((day, dayIndex) => (
        <CalendarDay day={day} dayIndex={dayIndex} key={`${weekIndex}-${dayIndex}`} />
      ))}
    </div>
  );
}

function CalendarDay({ day, dayIndex }: { day: CalendarDay; dayIndex: number }) {
  return (
    <div
      key={dayIndex}
      className={`
                  focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-offset-1 dark:focus:ring-offset-gray-900
                  relative flex flex-col items-center justify-start p-2 min-h-16 cursor-pointer
                  select-none transition-colors duration-150
                  ${
                    day.isCurrentMonth
                      ? "bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 hover:bg-blue-50 dark:hover:bg-gray-800"
                      : "bg-gray-50 dark:bg-gray-800 text-gray-400 dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }
                  ${day.events.length > 0 ? "ring-1 ring-inset ring-ring" : ""}
                `}
      data-date={getSortableDateString(day.date)}
    >
      <span className={`text-sm font-medium w-full ${isSameDay(day.date, new Date()) ? "bg-primary" : ""}`}>
        {day.day}
      </span>

      {/* Events */}
      <div className="mt-3 w-full flex flex-col gap-0.5">
        {day.events.map((event) => (
          <CalendarItem item={event} canSignup={false} key={event.id} />
        ))}
      </div>
    </div>
  );
}

function CalendarItem({ item, canSignup }: { item: EventListItem; canSignup: boolean }): ReactNode {
  const [state, setState] = useState<"expanded" | "collapsed">("collapsed");
  const dateParts = getDateRangeString(item.startAt, item.endAt);

  function toggleState() {
    setState((prev) => (prev === "expanded" ? "collapsed" : "expanded"));
  }

  return (
    <div className="border border-primary rounded-sm overflow-hidden text-foreground bg-secondary">
      <div className="flex flex-row items-center justify-between bg-primary p-1 ">
        <div className="line-clamp-1 font-semibold text-primary-foreground">{item.title}</div>
        <div className="text-primary-foreground">
          {state === "expanded" ? (
            <ChevronUp onClick={() => toggleState()} className="" />
          ) : (
            <ChevronDown onClick={() => toggleState()} className="" />
          )}
        </div>
      </div>

      {state === "expanded" && (
        <div className={cn("p-1 transition duration-500 ease-in-out", state === "expanded" ? "" : "hidden")}>
          {item.location && (
            <div className="line-clamp-1 text-sm">
              <span className="text-muted-foreground">at</span> {item.location}
            </div>
          )}

          {/* Dates */}
          <div className="text-sm mt-2">
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
          <Separator className="p-0.5 my-2 bg-muted-foreground" />
          <div className="grid grid-cols-3 text-sm">
            <div>
              {item.informationLink && (
                <a href={item.informationLink} target="_blank" className="underline">
                  Info
                </a>
              )}
            </div>
            <div>
              <Link to="/calendar/$id" params={{ id: item.id }} className="underline">
                Details
              </Link>
            </div>
            <div>
              {item.signupLink && (
                <div>
                  {canSignup && (
                    <a href={item.signupLink} target="_blank" className="underline">
                      Signup
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
