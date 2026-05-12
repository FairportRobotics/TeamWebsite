// prettier-ignore
import { db } from "@/db";
import { calendarTable } from "@/db/schema";
import { Permissions } from "@/lib/auth/permissions";
import { calendarIdSchema } from "@/server/functions/calendar/_common";
import { allPermissionsMiddleware } from "@/server/middleware/allPermissions";
import { authenticatedMiddleware } from "@/server/middleware/authenticated";
import { createServerFn } from "@tanstack/react-start";
import { zodValidator } from "@tanstack/zod-adapter";
import { eq } from "drizzle-orm";

export type CalendarForEdit = Awaited<ReturnType<typeof getCalendarForEditFn>>;
export const getCalendarForEditFn = createServerFn()
  .middleware([authenticatedMiddleware, allPermissionsMiddleware([Permissions.EventUpdate])])
  .inputValidator(zodValidator(calendarIdSchema))
  .handler(async ({ data }) => {
    // Retrieve the calendar, the dates and the users who have touched the record.
    const results = await db.query.calendarTable.findFirst({
      where: eq(calendarTable.id, data.id),
      with: {
        dates: true,
        createdBy: true,
        updatedBy: true,
      },
    });

    return results;
  });
