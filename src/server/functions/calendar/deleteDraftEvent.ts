// prettier-ignore
import { db } from "@/db";
import { dbEventDraft } from "@/db/schema";
import { eventIdSchema } from "@/server/functions/calendar/_common";
import { createServerFn } from "@tanstack/react-start";
import { zodValidator } from "@tanstack/zod-adapter";
import { eq } from "drizzle-orm";

export const deleteDraftEventFn = createServerFn()
  .validator(zodValidator(eventIdSchema))
  .handler(async ({ data }) => {
    try {
      await db.transaction(async (tx) => {
        await tx.delete(dbEventDraft).where(eq(dbEventDraft.id, data.id));
      });
    } catch (error) {
      console.error(error);
    }
  });
