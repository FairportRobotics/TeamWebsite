// prettier-ignore
import { db } from "@/db";
import { calendarDates, calendarTable, user } from "@/db/schema";
import { seedCalendar } from "@/db/seed/calendar";
import { createServerFn } from "@tanstack/react-start";
import { zodValidator } from "@tanstack/zod-adapter";
import { eq } from "drizzle-orm";
import { alias } from "drizzle-orm/pg-core";
import { z } from "zod";
import { assertAuthenticatedFn } from "../auth/server";
import { authenticatedMiddleware } from "../middleware/authenticatedMiddleware";

const calendarIdSchema = z.object({
  id: z.string(),
});

// TODO: Add support for optional date filtering.
// TODO: Add support for filtering by audience.
export type CalendarListItem = Awaited<ReturnType<typeof getPublishedCalendarItemsFn>>[0];
export const getPublishedCalendarItemsFn = createServerFn().handler(async () => {
  const results = db.select().from(calendarTable).where(eq(calendarTable.status, "published"));
  return results;
});

// TODO: Add support for optional date filtering.
// TODO: Restrict with permissions.
export type CalendarListForAdminItem = Awaited<ReturnType<typeof getCalendarListForAdminFn>>[0];
export const getCalendarListForAdminFn = createServerFn()
  .middleware([authenticatedMiddleware])
  .handler(async () => {
    const results = await db.query.calendarTable.findMany({
      with: {
        dates: true,
      },
    });

    return results;
  });

export type CalendarListDetailItem = Awaited<ReturnType<typeof getCalendarListDetailsFn>>;
export const getCalendarListDetailsFn = createServerFn()
  .middleware([authenticatedMiddleware])
  .inputValidator(zodValidator(calendarIdSchema))
  .handler(async ({ data }) => {
    const createdByUser = alias(user, "createdByUser");
    const updatedByUser = alias(user, "updatedByUser");

    const results = await db
      .select({
        id: calendarTable.id,
        status: calendarTable.status,
        visibleTo: calendarTable.visibleTo,
        title: calendarTable.title,
        description: calendarTable.description,
        location: calendarTable.location,
        informationLink: calendarTable.informationLink,
        signupLink: calendarTable.signupLink,
        signupLinkVisibleTo: calendarTable.signupLinkVisibleTo,

        createdAt: calendarTable.createdAt,
        createdBy: calendarTable.createdBy,
        createdByName: createdByUser.name,

        updatedBy: calendarTable.updatedBy,
        updatedAt: calendarTable.updatedAt,
        updatedByName: updatedByUser.name,
      })
      .from(calendarTable)
      .where(eq(calendarTable.id, data.id))
      .innerJoin(createdByUser, eq(createdByUser.id, calendarTable.createdBy))
      .innerJoin(updatedByUser, eq(updatedByUser.id, calendarTable.updatedBy))
      .then((res) => res[0] || null);
    return results;
  });

export const requestApprovalCalendarFn = createServerFn()
  .middleware([authenticatedMiddleware])
  .inputValidator(zodValidator(calendarIdSchema))
  .handler(async ({ data, context }) => {
    assertAuthenticatedFn();

    if (!context.user) {
      return false;
    }

    await db
      .update(calendarTable)
      .set({
        updatedBy: context.user.id,
        status: "pending_review",
      })
      .where(eq(calendarTable.id, data.id));

    return true;
  });

export const approveCalendarFn = createServerFn()
  .middleware([authenticatedMiddleware])
  .inputValidator(zodValidator(calendarIdSchema))
  .handler(async ({ data, context }) => {
    assertAuthenticatedFn();

    if (!context.user) {
      return false;
    }

    await db
      .update(calendarTable)
      .set({
        updatedBy: context.user.id,
        status: "published",
      })
      .where(eq(calendarTable.id, data.id));

    return true;
  });

export const archiveCalendarFn = createServerFn()
  .middleware([authenticatedMiddleware])
  .inputValidator(zodValidator(calendarIdSchema))
  .handler(async ({ data, context }) => {
    assertAuthenticatedFn();

    if (!context.user) {
      return false;
    }

    await db
      .update(calendarTable)
      .set({
        updatedBy: context.user.id,
        status: "archived",
      })
      .where(eq(calendarTable.id, data.id));

    return true;
  });

// TODO: Remove when live.
export const seedCalendarFn = createServerFn()
  .middleware([authenticatedMiddleware])
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
