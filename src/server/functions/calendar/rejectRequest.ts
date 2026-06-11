import { db } from "@/db";
import { dbEventDraft, dbEventDraftDate, dbEventDraftHistory } from "@/db/schema";
import { Permissions } from "@/lib/auth/permissions";
import { anyPermissionMiddleware } from "@/server/middleware/anyPermission";
import { authenticatedMiddleware } from "@/server/middleware/authenticated";
import { createServerFn } from "@tanstack/react-start";
import { zodValidator } from "@tanstack/zod-adapter";
import { eq } from "drizzle-orm";
import { z } from "zod";

// Create a schema for operations where we need to pass an Event identifier.
export const rejectSchema = z.object({
  id: z.string(),
  rejectReason: z.string(),
});

// TODO: Validate that the user has permission to perform this action based on the visibility options
// of the calendar item and the user's roles.
export const rejectRequestFn = createServerFn()
  .middleware([authenticatedMiddleware, anyPermissionMiddleware([Permissions.EventUpdate])])
  .validator(zodValidator(rejectSchema))
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

        // Throw an exception if the Event was not found.
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
          eventId: existingDraft.eventId,
          createdBy: currentUserId,
          status: "rejected",
          statusComments: data.rejectReason,

          title: existingDraft.title,
          description: existingDraft.description,
          visibleTo: existingDraft.visibleTo,
          location: existingDraft.location,

          informationLink: existingDraft.informationLink,
          signupLink: existingDraft.signupLink,
          signupLinkVisibleTo: existingDraft.signupLinkVisibleTo,
        });

        // Insert Draft Dates.
        existingDraft.dates.forEach(async (d) => {
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
