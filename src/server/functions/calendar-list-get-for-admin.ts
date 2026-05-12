import { db } from "@/db";
import { Permissions } from "@/lib/auth/permissions";
import { anyPermissionMiddleware } from "@/server/middleware/anyPermission";
import { authenticatedMiddleware } from "@/server/middleware/authenticated";
import { createServerFn } from "@tanstack/react-start";

// TODO: Add support for optional date filtering.
export type CalendarListForAdminItem = Awaited<ReturnType<typeof getCalendarListForAdminFn>>[0];
export const getCalendarListForAdminFn = createServerFn()
  .middleware([authenticatedMiddleware, anyPermissionMiddleware([Permissions.EventAdminister])])
  .handler(async () => {
    // Query the calendar table and include the child dates.
    const results = await db.query.calendarTable.findMany({
      with: {
        dates: true,
        createdBy: true,
        updatedBy: true,
      },
    });

    return results;
  });
