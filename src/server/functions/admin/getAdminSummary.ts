// prettier-ignore
import { db } from "@/db";
import { dbEventDate, dbEventDraft } from "@/db/schema";
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
        status: dbEventDraft.status,
        count: count(dbEventDraft.id),
      })
      .from(dbEventDraft)
      .groupBy(dbEventDraft.status);

    const calendarPeriodPromise = db
      .select({
        upcoming:
          sql`COUNT(DISTINCT event_id) FILTER (WHERE ${dbEventDate.startAt} >= NOW())`.mapWith(
            Number,
          ),
        elapsed:
          sql`COUNT(DISTINCT event_id) FILTER (WHERE ${dbEventDate.startAt} < NOW())`.mapWith(
            Number,
          ),
      })
      .from(dbEventDate)
      .limit(1)
      .then((res) => res[0] || null);

    const [calendarStatusMetrics, calendarPeriodMetrics] = await Promise.all([
      calendarStatusPromise,
      calendarPeriodPromise,
    ]);

    return { calendarStatusMetrics, calendarPeriodMetrics };
  });
