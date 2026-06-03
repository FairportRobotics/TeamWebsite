// prettier-ignore
import { db } from "@/db";
import { dbEvent } from "@/db/schema";
import { eventCodeSchema } from "@/server/functions/calendar/_common";
import { createServerFn } from "@tanstack/react-start";
import { zodValidator } from "@tanstack/zod-adapter";
import { eq } from "drizzle-orm";

export const deleteEventFn = createServerFn()
  .inputValidator(zodValidator(eventCodeSchema))
  .handler(async ({ data }) => {
    try {
      await db.transaction(async (tx) => {
        await tx.delete(dbEvent).where(eq(dbEvent.code, data.code));
      });
    } catch (error) {
      console.error(error);
    }
  });
