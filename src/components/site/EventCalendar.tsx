import { Card, CardContent } from "@/components/ui/card";
import { getFriendlyMonthYearString, getShortTimeString, getSortableDateString } from "@/lib/utils";
import type { EventListItem } from "@/server/functions/calendar/getPublishedEventList";
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  isSameDay,
  isSameMonth,
  startOfDay,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns";
import { enUS } from "date-fns/locale";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
      <CardContent>
        <MonthHeader currentDate={currentDate} prevMonth={prevMonth} nextMonth={nextMonth} />
        <CalendarGrid currentDate={currentDate} weekDays={weekDays} calendarData={calendarData} />
      </CardContent>
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
    <div className="flex items-center justify-between px-4 py-3 border-b border-border">
      <button
        onClick={prevMonth}
        className="p-2 rounded-lg hover:bg-accent text-muted-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
        aria-label="Previous month"
      >
        <ChevronLeft />
      </button>
      <h2 className="text-lg font-semibold">{getFriendlyMonthYearString(currentDate)}</h2>
      <button
        onClick={nextMonth}
        className="p-2 rounded-lg hover:bg-accent text-muted-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
        aria-label="Next month"
      >
        <ChevronRight />
      </button>
    </div>
  );
}

function CalendarGrid({
  currentDate,
  weekDays,
  calendarData,
}: {
  currentDate: Date;
  weekDays: string[];
  calendarData: CalendarDay[][];
}) {
  return (
    <div className="grid grid-cols-7">
      {/* Weekday Headers */}
      {weekDays.map((day) => (
        <WeekdayHeader day={day} key={day} />
      ))}

      {/* Days */}
      {calendarData.map((week, weekIndex) => (
        <CalendarWeek currentDate={currentDate} week={week} weekIndex={weekIndex} key={weekIndex} />
      ))}
    </div>
  );
}

function WeekdayHeader({ day }: { day: string }) {
  return (
    <div key={day} className="py-2 bg-muted text-center text-sm font-medium text-muted-foreground">
      {day}
    </div>
  );
}

function CalendarWeek({
  currentDate,
  week,
  weekIndex,
}: {
  currentDate: Date;
  week: CalendarDay[];
  weekIndex: number;
}): ReactNode {
  return (
    <div className="contents" key={weekIndex} data-week-index={weekIndex}>
      {week.map((day, dayIndex) => (
        <CalendarDay currentDate={currentDate} day={day} dayIndex={dayIndex} key={`${weekIndex}-${dayIndex}`} />
      ))}
    </div>
  );
}

function CalendarDay({ currentDate, day, dayIndex }: { currentDate: Date; day: CalendarDay; dayIndex: number }) {
  return (
    <div
      key={dayIndex}
      className={`
                  focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1 
                  relative flex flex-col items-center justify-start min-h-20 cursor-pointer
                  select-none transition-colors duration-150 border
                  ${startOfDay(day.date) >= startOfDay(currentDate) ? "" : "bg-muted/50 text-muted-foreground/50"}
                  ${day.isCurrentMonth ? "" : "bg-muted/75 text-muted-foreground/25"}
                  ${isSameDay(day.date, currentDate) ? "border-primary border-2" : "border"}
                `}
      data-date={getSortableDateString(day.date)}
    >
      <span className={`text-sm w-full p-1 ${isSameDay(day.date, currentDate) ? "border-secondary" : ""}`}>
        {day.day}
      </span>

      {/* Events */}
      <div className="mt-3 w-full flex flex-col gap-0.5">
        {day.events.map((event) => (
          <CalendarEvent event={event} />
        ))}
      </div>
    </div>
  );
}

function CalendarEvent({ event }: { event: EventListItem }): ReactNode {
  return (
    <div className="bg-accent-foreground text-secondary-foreground text-sm my-1 mx-0.5 p-1 rounded-l border-l-4 border-l-destructive">
      <div>
        {getShortTimeString(event.startAt)} {event.title}
      </div>
    </div>
  );
}
