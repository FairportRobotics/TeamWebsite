// prettier-ignore
import { db } from "@/db";
import { dbEvent, dbEventDate } from "@/db/schema";
import { calendarIdSchema } from "@/server/functions/calendar/_common";
import { createServerFn } from "@tanstack/react-start";
import { zodValidator } from "@tanstack/zod-adapter";
import { eq } from "drizzle-orm";

export const deleteCalendarFn = createServerFn()
  .inputValidator(zodValidator(calendarIdSchema))
  .handler(async ({ data }) => {
    try {
      // Delete within a transaction.
      await db.transaction(async (tx) => {
        await tx.delete(dbEventDate).where(eq(dbEventDate.calendarId, data.id));
        await tx.delete(dbEvent).where(eq(dbEvent.id, data.id));
      });
    } catch (error) {
      console.error(error);
    }
  });
