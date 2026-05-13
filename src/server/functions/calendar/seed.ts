// prettier-ignore
import { db } from "@/db";
import { calendarDates, calendarTable } from "@/db/schema";
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
    seedCalendar.forEach(async (s) => {
      console.log("🌱 Seeding Calendar", s.title);

      try {
        // Declare a UUID we can use for the calendar and the date children.
        const id = crypto.randomUUID();

        // Insert records in a transaction so we can rollback if anything goes sideways.
        await db.transaction(async (tx) => {
          await tx.insert(calendarTable).values({
            id: id,
            title: s.title,
            description: s.description,
            visibleTo: s.visibleTo,
            location: s.location,

            informationLink: s.informationLink,
            signupLink: s.signupLink,
            signupLinkVisibleTo: s.signupLinkVisibleTo,

            createdBy: currentUserId,
            updatedBy: currentUserId,
          });

          s.dates.forEach(async (d) => {
            await tx.insert(calendarDates).values({
              calendarId: id,
              startAt: d.startAt,
              endAt: d.endAt,
            });
          });
        });
      } catch (error) {
        console.log("⚠️ Failed to seed calendar item", s.title);
        console.error(error);
      }
    });
  });
