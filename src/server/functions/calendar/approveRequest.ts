import { db } from "@/db";
import { dbEvent, dbEventDate, dbEventDraft, dbEventDraftHistory } from "@/db/schema";
import { Permissions } from "@/lib/auth/permissions";
import { eventIdSchema } from "@/server/functions/calendar/_common";
import { anyPermissionMiddleware } from "@/server/middleware/anyPermission";
import { authenticatedMiddleware } from "@/server/middleware/authenticated";
import { createServerFn } from "@tanstack/react-start";
import { zodValidator } from "@tanstack/zod-adapter";
import { eq } from "drizzle-orm";

export const approveRequest = createServerFn()
  .middleware([authenticatedMiddleware, anyPermissionMiddleware([Permissions.EventApprove])])
  .validator(zodValidator(eventIdSchema))
  .handler(async ({ data, context }) => {
    const currentUserId = context!.user!.id;

    try {
      // Insert records in a transaction so we can rollback if anything goes sideways.
      await db.transaction(async (tx) => {
        // Retrieve the existing Draft.
        const draft = await tx.query.dbEventDraft.findFirst({
          where: eq(dbEventDraft.id, data.id),
          with: {
            dates: true,
            createdBy: true,
          },
        });

        // Verify the Draft was loaded.
        if (!draft) throw new Error("Event draft not found");

        // If this draft is to replace an edit to and Event, log the history.
        if (draft.eventId) {
          // Retrieve the Published Event.
          const published = await tx.query.dbEvent.findFirst({
            where: eq(dbEvent.id, draft.eventId),
            with: {
              dates: true,
              createdBy: true,
            },
          });

          // Create a history record of the Published Event.
          await tx.insert(dbEventDraftHistory).values({
            draftId: draft.id,
            eventId: draft.eventId,
            snapshot: JSON.stringify(published),
          });

          // Delete the Published Event as we are going to be replacing it with the promoted Draft.
          await tx.delete(dbEvent).where(eq(dbEvent.id, draft.eventId));
        }

        await tx.delete(dbEventDraft).where(eq(dbEventDraft.id, draft.id));

        // Publish the Event and the Event Dates.
        await tx.insert(dbEvent).values({
          id: draft.eventId ?? draft.id,
          createdBy: currentUserId,

          title: draft.title,
          description: draft.description,
          visibleTo: draft.visibleTo,
          location: draft.location,

          informationLink: draft.informationLink,
          signupLink: draft.signupLink,
          signupLinkVisibleTo: draft.signupLinkVisibleTo,
        });

        draft.dates.forEach(async (d) => {
          await tx.insert(dbEventDate).values({
            eventId: draft.eventId ?? draft.id,
            startAt: d.startAt,
            endAt: d.endAt,
          });
        });

        // Return the Published Event.
        return await tx.query.dbEvent.findFirst({
          where: eq(dbEvent.id, draft.eventId ?? draft.id),
          with: {
            dates: true,
            createdBy: true,
          },
        });
      });
    } catch (error) {
      console.error(error);
    }

    return null;
  });
