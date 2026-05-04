import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameMonth,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns";
import { enUS } from "date-fns/locale";
import { useState } from "react";

export interface CalendarEvent {
  id: string;
  title: string;
  date: Date | string; // Accept both for flexibility
  time?: string;
}

export interface CalendarDay {
  date: Date;
  day: number;
  month: number;
  year: number;
  isCurrentMonth: boolean;
  events: CalendarEvent[];
}

interface CalendarProps {
  initialMonth: Date;
  events: CalendarEvent[];
  onDateSelect?: (date: Date) => void;
}

export function buildCalendarData(referenceDate: Date, events: CalendarEvent[]): CalendarDay[][] {
  // 1. Define the visible range (includes padding days)
  const monthStart = startOfMonth(referenceDate);
  const monthEnd = endOfMonth(referenceDate);
  const startDate = startOfWeek(monthStart, { locale: enUS });
  const endDate = endOfWeek(monthEnd, { locale: enUS });

  // 2. Pre-index events by date string for O(1) lookup
  const eventsByDate = new Map<string, CalendarEvent[]>();
  for (const event of events) {
    const dateKey = format(new Date(event.date), "yyyy-MM-dd");
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
    <div className="w-full max-w-6xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Month Navigation Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
        <button
          onClick={prevMonth}
          className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Previous month"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
        <h2 className="text-lg font-semibold text-gray-800">{format(currentDate, "MMMM yyyy")}</h2>
        <button
          onClick={nextMonth}
          className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Next month"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-px bg-gray-200">
        {/* Weekday Headers */}
        {weekDays.map((day) => (
          <div key={day} className="bg-gray-50 text-center text-xs font-medium text-gray-500 py-2">
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
                  relative flex flex-col items-center justify-start p-2 min-h-16 cursor-pointer
                  select-none transition-colors duration-150
                  ${day.isCurrentMonth ? "bg-white text-gray-800 hover:bg-blue-50" : "bg-gray-50 text-gray-400 hover:bg-gray-100"}
                  ${day.events.length > 0 ? "ring-1 ring-inset ring-blue-100" : ""}
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1
                `}
                data-date={format(day.date, "yyyy-MM-dd")}
              >
                <span className="text-sm font-medium">{day.day}</span>
                <div className="mt-1 w-full flex flex-col gap-0.5">
                  {day.events.map((event) => (
                    <div
                      key={event.id}
                      className="text-[10px] px-1 py-0.5 bg-blue-100 text-blue-700 rounded truncate font-medium"
                      title={`${event.title}${event.time ? ` at ${event.time}` : ""}`}
                    >
                      {event.title}
                      {event.time && <span className="block opacity-75">{event.time}</span>}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
