// prettier-ignore
import { db } from "@/db";
import { dbEvent } from "@/db/schema";
import { calendarIdSchema } from "@/server/functions/calendar/_common";
import { createServerFn } from "@tanstack/react-start";
import { zodValidator } from "@tanstack/zod-adapter";
import { eq } from "drizzle-orm";

export type CalendarListDetailItem = Awaited<ReturnType<typeof getCalendarListDetailsFn>>;
export const getCalendarListDetailsFn = createServerFn()
  .inputValidator(zodValidator(calendarIdSchema))
  .handler(async ({ data }) => {
    // Retrieve the calendar, the dates and the users who have touched the record.
    const results = await db.query.dbEvent.findFirst({
      where: eq(dbEvent.id, data.id),
      with: {
        dates: true,
        createdBy: true,
        updatedBy: true,
      },
    });

    return results;
  });
