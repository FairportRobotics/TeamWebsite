// prettier-ignore
import { db } from "@/db";
import { dbEvent, dbEventDraft, dbEventDraftHistory } from "@/db/schema";
import { eventIdSchema } from "@/server/functions/calendar/_common";
import { createServerFn } from "@tanstack/react-start";
import { zodValidator } from "@tanstack/zod-adapter";
import { eq, or } from "drizzle-orm";

export type EventListDetailItem = Awaited<ReturnType<typeof getEventListDetailsFn>>;
export type DetailPublised = Awaited<ReturnType<typeof getEventListDetailsFn>>["published"];
export type DetailDraft = Awaited<ReturnType<typeof getEventListDetailsFn>>["draft"];
export type DetailHistory = Awaited<ReturnType<typeof getEventListDetailsFn>>["history"][0];

export const getEventListDetailsFn = createServerFn()
  .inputValidator(zodValidator(eventIdSchema))
  .handler(async ({ data }) => {
    // Get any Published versions of the Event.
    const published = await db.query.dbEvent.findFirst({
      where: eq(dbEvent.id, data.id),
      with: {
        dates: true,
        createdBy: true,
      },
    });

    // Get any Draft versions of the Event.
    const draft = await db.query.dbEventDraft.findFirst({
      where: eq(dbEventDraft.id, data.id),
      with: {
        dates: true,
        createdBy: true,
      },
    });

    // Get History of the Event.
    const history = await db.query.dbEventDraftHistory.findMany({
      where: or(eq(dbEventDraftHistory.draftId, data.id), eq(dbEventDraftHistory.eventId, data.id)),
    });

    return { published, draft, history };
  });
