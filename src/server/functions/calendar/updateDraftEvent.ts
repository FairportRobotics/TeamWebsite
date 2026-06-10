import { db } from "@/db";
import { dbEventDraft, dbEventDraftDate, dbEventDraftHistory } from "@/db/schema";
import { Permissions } from "@/lib/auth/permissions";
import { updateEventSchema } from "@/server/functions/calendar/_common";
import { anyPermissionMiddleware } from "@/server/middleware/anyPermission";
import { authenticatedMiddleware } from "@/server/middleware/authenticated";
import { createServerFn } from "@tanstack/react-start";
import { zodValidator } from "@tanstack/zod-adapter";
import { eq } from "drizzle-orm";

// TODO: Validate that the user has permission to perform this action based on the visibility options
// of the calendar item and the user's roles.
export const updateDraftEventFn = createServerFn()
  .middleware([authenticatedMiddleware, anyPermissionMiddleware([Permissions.EventUpdate])])
  .inputValidator(zodValidator(updateEventSchema))
  .handler(async ({ data, context }) => {
    console.log("updateDraftEventFn data", data);
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

        console.log("updateDraftEventFn existingDraft", existingDraft);

        // Save History
        if (!existingDraft) throw new Error("Event draft not found");

        // Create a history record of the Draft.
        console.log("updateDraftEventFn Create a history record of the Draft starting");
        await tx.insert(dbEventDraftHistory).values({
          draftId: existingDraft.id,
          eventId: existingDraft.eventId,
          snapshot: existingDraft,
        });
        console.log("updateDraftEventFn Create a history record of the Draft completed");

        // Delete existing Draft.
        console.log("updateDraftEventFn Delete existing Draft starting");
        await tx.delete(dbEventDraft).where(eq(dbEventDraft.id, data.id!));
        console.log("updateDraftEventFn Delete existing Draft completed");

        // Insert new Draft.
        console.log("updateDraftEventFn Insert new Draft starting");
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
        console.log("updateDraftEventFn Insert new Draft starting");

        // Insert Draft Dates.
        console.log("updateDraftEventFn Insert new Draft starting");
        data.dates.forEach(async (d) => {
          await tx.insert(dbEventDraftDate).values({
            draftId: data.id,
            startAt: d.startAt,
            endAt: d.endAt,
          });
        });
        console.log("updateDraftEventFn Insert new Draft completed");
      });
    } catch (error) {
      console.error(error);
    }
  });
