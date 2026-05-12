// prettier-ignore
import { db } from "@/db";
import { calendarDates, calendarTable, visibleEnum, type VisibleEnumType } from "@/db/schema";
import { seedCalendar } from "@/db/seed/calendar";
import { Roles } from "@/lib/auth/roles";
import { assertAuthenticatedFn } from "@/lib/auth/server";
import { createServerFn } from "@tanstack/react-start";
import { zodValidator } from "@tanstack/zod-adapter";
import { and, arrayOverlaps, eq } from "drizzle-orm";
import { z } from "zod";
import { authenticatedMiddleware } from "../middleware/authenticatedMiddleware";

// TODO: Refactor to use the InferResultType utility type from _common.ts for better type safety and
// consistency across database query results. This will help ensure that the types of the results we
// get from our database queries are accurate and consistent with our schema definitions.
export const VisibleToOptions = [
  Roles.Everyone,
  Roles.Student,
  Roles.Mentor,
  Roles.Parent,
] as const;

// Create a schema for validating the date ranges for calendar events. We will use this as a
// nested schema in the main calendar insert and update schema.
export const calendarDateInsertSchema = z.object({
  startAt: z.date(),
  endAt: z.date(),
});

// Create a schema for validating calendar insert and update operations. We can reuse this for
// both operations since they have the same requirements.
export const calendarInsertSchema = z
  .object({
    title: z.string().trim().min(1, "Title is required"),
    description: z.string().trim().min(1, "Description is required"),
    location: z.string().trim().min(1, "Location is required"),
    visibleTo: z
      .array(z.enum(VisibleToOptions))
      .min(1, "At least one visibility option must be selected"),
    dates: z.array(calendarDateInsertSchema).min(1, "At least one date range is required"),
    informationLink: z.url().optional().or(z.literal("")),
    signupLink: z.url().optional().or(z.literal("")),
    signupLinkVisibleTo: z.array(z.enum(VisibleToOptions)),
  })
  .refine(
    (data) => {
      // TODO: This is messy but easy to follow.
      if (data.signupLink === undefined) {
        return true;
      } else if (data.signupLink.trim() === "") {
        return true;
      } else if (data.signupLinkVisibleTo.length > 0) {
        return true;
      }

      return false;
    },
    {
      message: "Must select visibility options if signup link is provided",
      path: ["signupLinkVisibleTo"],
    },
  );

// Create a schema for operations where we need to pass a calendar identifier.
const calendarIdSchema = z.object({
  id: z.string(),
});

// TODO: Add support for optional date filtering.
export type CalendarListItem = Awaited<ReturnType<typeof getPublishedCalendarItemsFn>>[0];
export const getPublishedCalendarItemsFn = createServerFn()
  .middleware([authenticatedMiddleware])
  .handler(async ({ context }) => {
    // Default to everyone.
    let visibleTo: VisibleEnumType[] = [Roles.Everyone];

    // Split the user's roles and add the overlapping roles to an array we can pass to the database.
    if (context.user) {
      const userRoles = context.user.role.split(",");
      const commonElements = visibleEnum.enumValues.filter((item) => userRoles.includes(item));
      visibleTo = [...visibleTo, ...commonElements] as VisibleEnumType[];
    }

    // Retrieve calendar events flattened. In other words, we want a record per combination
    // of calendar and date. We do not want to roll the dates into a collection under each
    // calendar record.
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

        startAt: calendarDates.startAt,
        endAt: calendarDates.endAt,
      })
      .from(calendarTable)
      .innerJoin(calendarDates, eq(calendarTable.id, calendarDates.calendarId))
      .where(
        and(
          eq(calendarTable.status, "published"),
          arrayOverlaps(calendarTable.visibleTo, visibleTo),
        ),
      )
      .orderBy(calendarDates.startAt);

    return results;
  });

// TODO: Add support for optional date filtering.
// TODO: Restrict with permissions.
export type CalendarListForAdminItem = Awaited<ReturnType<typeof getCalendarListForAdminFn>>[0];
export const getCalendarListForAdminFn = createServerFn()
  .middleware([authenticatedMiddleware])
  .handler(async () => {
    // Query the calendar table and include the child dates.
    const results = await db.query.calendarTable.findMany({
      with: {
        dates: true,
        createdBy: true,
        updatedBy: true,
      },
    });

    return results;
  });

export type CalendarListDetailItem = Awaited<ReturnType<typeof getCalendarListDetailsFn>>;
export const getCalendarListDetailsFn = createServerFn()
  .middleware([authenticatedMiddleware])
  .inputValidator(zodValidator(calendarIdSchema))
  .handler(async ({ data }) => {
    // Retrieve the calendar, the dates and the users who have touched the record.
    const results = await db.query.calendarTable.findFirst({
      where: eq(calendarTable.id, data.id),
      with: {
        dates: true,
        createdBy: true,
        updatedBy: true,
      },
    });

    return results;
  });

export type CalendarForEdit = Awaited<ReturnType<typeof getCalendarForEditFn>>;
export const getCalendarForEditFn = createServerFn()
  .middleware([authenticatedMiddleware])
  .inputValidator(zodValidator(calendarIdSchema))
  .handler(async ({ data }) => {
    // Retrieve the calendar, the dates and the users who have touched the record.
    const results = await db.query.calendarTable.findFirst({
      where: eq(calendarTable.id, data.id),
      with: {
        dates: true,
        createdBy: true,
        updatedBy: true,
      },
    });

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

// TODO: Validate that the user has permission to perform this action based on the visibility options
// of the calendar item and the user's roles.
export const saveCalendarFn = createServerFn()
  .middleware([authenticatedMiddleware])
  .inputValidator(zodValidator(calendarInsertSchema))
  .handler(async ({ data, context }) => {
    try {
      const currentUserId = context!.user!.id;
      const id = crypto.randomUUID();

      // Insert records in a transaction so we can rollback if anything goes sideways.
      await db.transaction(async (tx) => {
        await tx.insert(calendarTable).values({
          id: id,
          title: data.title,
          description: data.description ? data.description.split("\n") : undefined,
          visibleTo: data.visibleTo,
          location: data.location,

          informationLink: data.informationLink,
          signupLink: data.signupLink,
          signupLinkVisibleTo: data.signupLinkVisibleTo,

          createdBy: currentUserId,
          updatedBy: currentUserId,
        });

        data.dates.forEach(async (d) => {
          await tx.insert(calendarDates).values({
            calendarId: id,
            startAt: d.startAt,
            endAt: d.endAt,
          });
        });
      });
    } catch (error) {
      console.error(error);
    }
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
