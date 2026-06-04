// prettier-ignore
import { db } from "@/db";
import { dbEventDraft, dbEventDraftDate } from "@/db/schema";
import { seedCalendar } from "@/db/seed/calendar";
import { Permissions } from "@/lib/auth/permissions";
import { anyPermissionMiddleware } from "@/server/middleware/anyPermission";
import { sessionMiddleware } from "@/server/middleware/session";
import { createServerFn } from "@tanstack/react-start";

// TODO: Remove when live.
export const seedEventsFn = createServerFn()
  .middleware([
    sessionMiddleware,
    anyPermissionMiddleware([Permissions.EventAdminister, Permissions.EventCreate]),
  ])
  .handler(async ({ context }) => {
    const currentUserId = context!.user!.id;

    seedCalendar.forEach(async (data) => {
      console.log("🌱 Seeding Calendar", data.title);
      const id = crypto.randomUUID();

      try {
        // Insert records in a transaction so we can rollback if anything goes sideways.
        await db.transaction(async (tx) => {
          await tx.insert(dbEventDraft).values({
            id: id,
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
      } catch (error) {
        console.error(error);
      }
    });
  });
