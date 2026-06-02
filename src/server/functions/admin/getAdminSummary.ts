// prettier-ignore
import { db } from "@/db";
import { calendarDates, calendarTable } from "@/db/schema";
import { authenticatedMiddleware } from "@/server/middleware/authenticated";
import { createServerFn } from "@tanstack/react-start";
import { count, sql } from "drizzle-orm";

export type AdminSummary = Awaited<ReturnType<typeof getAdminSummaryFn>>;
export const getAdminSummaryFn = createServerFn()
  .middleware([authenticatedMiddleware])
  .handler(async () => {
    // Return metrics for the calendar.
    const calendarStatusPromise = db
      .select({
        status: calendarTable.status,
        count: count(calendarTable.id),
      })
      .from(calendarTable)
      .groupBy(calendarTable.status);

    const calendarPeriodPromise = db
      .select({
        upcoming:
          sql`COUNT(DISTINCT calendar_id) FILTER (WHERE ${calendarDates.startAt} >= NOW())`.mapWith(
            Number,
          ),
        elapsed:
          sql`COUNT(DISTINCT calendar_id) FILTER (WHERE ${calendarDates.startAt} < NOW())`.mapWith(
            Number,
          ),
      })
      .from(calendarDates)
      .limit(1)
      .then((res) => res[0] || null);

    const [calendarStatusMetrics, calendarPeriodMetrics] = await Promise.all([
      calendarStatusPromise,
      calendarPeriodPromise,
    ]);

    return { calendarStatusMetrics, calendarPeriodMetrics };
  });
