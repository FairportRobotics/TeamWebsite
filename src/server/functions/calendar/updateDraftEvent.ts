import { db } from "@/db";
import { dbEventDraft, dbEventDraftDate, dbEventDraftHistory } from "@/db/schema";
import { updateDraftEventSchema } from "@/features/admin/event/draft/update-draft-event.schema";
import { Permissions } from "@/lib/auth/permissions";
import { anyPermissionMiddleware } from "@/server/middleware/anyPermission";
import { authenticatedMiddleware } from "@/server/middleware/authenticated";
import { createServerFn } from "@tanstack/react-start";
import { zodValidator } from "@tanstack/zod-adapter";
import { eq } from "drizzle-orm";

// TODO: Validate that the user has permission to perform this action based on the visibility options
// of the calendar item and the user's roles.
export const updateDraftEventFn = createServerFn()
  .middleware([authenticatedMiddleware, anyPermissionMiddleware([Permissions.EventUpdate])])
  .validator(zodValidator(updateDraftEventSchema))
  .handler(async ({ data, context }) => {
    const currentUserId = context!.user!.id;

    try {
      await db.transaction(async (tx) => {
        // Retrieve Draft Event.
        const existingDraft = await tx.query.dbEventDraft.findFirst({
          where: eq(dbEventDraft.id, data.id!),
          with: {
            dates: true,
            createdBy: true,
          },
        });

        // Save History
        if (!existingDraft) throw new Error("Event draft not found");

        // Create a history record of the Draft.
        await tx.insert(dbEventDraftHistory).values({
          draftId: existingDraft.id,
          eventId: existingDraft.eventId,
          snapshot: JSON.stringify(existingDraft),
        });

        // Delete existing Draft.
        await tx.delete(dbEventDraft).where(eq(dbEventDraft.id, data.id!));

        // Insert new Draft.
        await tx.insert(dbEventDraft).values({
          id: data.id!,
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

        // Insert Draft Dates.
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
