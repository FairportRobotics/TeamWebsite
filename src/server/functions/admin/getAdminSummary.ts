// prettier-ignore
import { db } from "@/db";
import { calendarTable } from "@/db/schema";
import { authenticatedMiddleware } from "@/server/middleware/authenticated";
import { createServerFn } from "@tanstack/react-start";
import { count } from "drizzle-orm";

export type AdminSummary = Awaited<ReturnType<typeof getAdminSummaryFn>>;
export const getAdminSummaryFn = createServerFn()
  .middleware([authenticatedMiddleware])
  .handler(async () => {
    // Return metrics for the calendar.
    const calendarMetricsPromise = db
      .select({
        status: calendarTable.status,
        count: count(calendarTable.id),
      })
      .from(calendarTable)
      .groupBy(calendarTable.status);

    const [calendarMetrics] = await Promise.all([calendarMetricsPromise]);

    return { calendarMetrics };
  });
