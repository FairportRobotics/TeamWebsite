import { db } from "@/db";
import { dbEventDraft, dbEventDraftDate } from "@/db/schema";
import { createEventSchema } from "@/features/admin/event/new/create-event.schema";
import { Permissions } from "@/lib/auth/permissions";
import { anyPermissionMiddleware } from "@/server/middleware/anyPermission";
import { authenticatedMiddleware } from "@/server/middleware/authenticated";
import { createServerFn } from "@tanstack/react-start";
import { zodValidator } from "@tanstack/zod-adapter";
import { eq } from "drizzle-orm";

// TODO: Validate that the user has permission to perform this action based on the visibility options
// of the calendar item and the user's roles.
export const createEventFn = createServerFn()
  .middleware([authenticatedMiddleware, anyPermissionMiddleware([Permissions.EventUpdate])])
  .validator(zodValidator(createEventSchema))
  .handler(async ({ data, context }) => {
    const currentUserId = context!.user!.id;
    const id = crypto.randomUUID();

    try {
      // Insert records in a transaction so we can rollback if anything goes sideways.
      await db.transaction(async (tx) => {
        await tx.insert(dbEventDraft).values({
          id: id,
          eventId: null,
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
            draftId: id,
            startAt: d.startAt,
            endAt: d.endAt,
          });
        });
      });

      // Return the newly created draft.
      return db.query.dbEventDraft.findFirst({
        where: eq(dbEventDraft.id, id),
        with: {
          dates: true,
          createdBy: true,
        },
      });
    } catch (error) {
      console.error(error);
    }
  });
