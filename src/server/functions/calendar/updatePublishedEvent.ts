import { db } from "@/db";
import { dbEvent, dbEventDraft, dbEventDraftDate, dbEventDraftHistory } from "@/db/schema";
import { updatePublishedEventSchema } from "@/features/admin/events/published/update-published-event.schema";
import { Permissions } from "@/lib/auth/permissions";
import { anyPermissionMiddleware } from "@/server/middleware/anyPermission";
import { authenticatedMiddleware } from "@/server/middleware/authenticated";
import { createServerFn } from "@tanstack/react-start";
import { zodValidator } from "@tanstack/zod-adapter";
import { eq } from "drizzle-orm";

// TODO: Validate that the user has permission to perform this action based on the visibility options
// of the calendar item and the user's roles.
export const updatePublishedEventFn = createServerFn()
  .middleware([authenticatedMiddleware, anyPermissionMiddleware([Permissions.EventUpdate])])
  .validator(zodValidator(updatePublishedEventSchema))
  .handler(async ({ data, context }) => {
    const currentUserId = context!.user!.id;

    try {
      await db.transaction(async (tx) => {
        // Retrieve Published Event.
        const existingEvent = await tx.query.dbEvent.findFirst({
          where: eq(dbEvent.id, data.id),
          with: {
            dates: true,
            createdBy: true,
          },
        });

        // Save History
        if (!existingEvent) throw new Error("Event not found");

        // Create a history record of the Published Event.
        await tx.insert(dbEventDraftHistory).values({
          eventId: existingEvent.id,
          snapshot: JSON.stringify(existingEvent),
        });

        // Insert new Draft.
        await tx.insert(dbEventDraft).values({
          id: data.id,
          eventId: data.eventId,
          createdBy: currentUserId,
          status: "draft",

          title: data.title,
          description: data.description,
          visibleTo: data.visibleTo,
          location: data.location,

          informationLink: data.informationLink,
          signupLink: data.signupLink,
          signupLinkVisibleTo: data.signupLinkVisibleTo,
        });

        data.dates.forEach(async (d) => {
          await tx.insert(dbEventDraftDate).values({
            draftId: data.id,
            startAt: d.startAt,
            endAt: d.endAt,
          });
        });
      });
    } catch (error) {
      console.error(error);
    }
  });
