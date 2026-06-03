// prettier-ignore
import { db } from "@/db";
import { dbEvent, dbEventDate } from "@/db/schema";
import { Permissions } from "@/lib/auth/permissions";
import { eventIdSchema } from "@/server/functions/calendar/_common";
import { anyPermissionMiddleware } from "@/server/middleware/anyPermission";
import { authenticatedMiddleware } from "@/server/middleware/authenticated";
import { createServerFn } from "@tanstack/react-start";
import { zodValidator } from "@tanstack/zod-adapter";
import { eq } from "drizzle-orm";

export const requestApprovalCalendarFn = createServerFn()
  .middleware([authenticatedMiddleware, anyPermissionMiddleware([Permissions.EventUpdate])])
  .inputValidator(zodValidator(eventIdSchema))
  .handler(async ({ data, context }) => {
    const currentUserId = context!.user!.id;
    const newEventid = crypto.randomUUID();

    try {
      // Insert records in a transaction so we can rollback if anything goes sideways.
      await db.transaction(async (tx) => {
        // Retrieve the existing version so we can get its values.
        const originalEvent = await db.query.dbEvent.findFirst({
          where: eq(dbEvent.id, data.id),
          with: {
            dates: true,
            createdBy: true,
          },
        });

        if (!originalEvent) {
          tx.rollback();
          throw new Error("Unable to locate the Event");
        }

        // Flip the original active to false.
        await tx
          .update(dbEvent)
          .set({
            active: false,
          })
          .where(eq(dbEvent.id, data.id));

        // Insert the new Event with the status changed.
        await tx.insert(dbEvent).values({
          id: newEventid,
          code: originalEvent.code,
          createdBy: currentUserId,
          active: true,
          status: "pending",

          title: originalEvent.title,
          description: originalEvent.description,
          visibleTo: originalEvent.visibleTo,
          location: originalEvent.location,

          informationLink: originalEvent.informationLink,
          signupLink: originalEvent.signupLink,
          signupLinkVisibleTo: originalEvent.signupLinkVisibleTo,
        });

        // Insert the dates for the new Event.
        originalEvent.dates.forEach(async (d) => {
          await tx.insert(dbEventDate).values({
            eventId: newEventid,
            startAt: d.startAt,
            endAt: d.endAt,
          });
        });
      });
    } catch (error) {
      console.error(error);
    }
  });
