// prettier-ignore
import { db } from "@/db";
import { calendarDates, calendarTable, visibleEnum, type VisibleEnumType } from "@/db/schema";
import { Roles } from "@/lib/auth/roles";
import { sessionMiddleware } from "@/server/middleware/session";
import { createServerFn } from "@tanstack/react-start";
import { and, arrayOverlaps, eq } from "drizzle-orm";

// TODO: Add support for optional date filtering.
export type CalendarListItem = Awaited<ReturnType<typeof getPublishedCalendarListFn>>[0];
export const getPublishedCalendarListFn = createServerFn()
  .middleware([sessionMiddleware])
  .handler(async ({ context }) => {
    // Default to everyone.
    let visibleTo: VisibleEnumType[] = [Roles.Everyone];

    // Split the user's roles and add the overlapping roles to an array we can pass to the database.
    if (context && context.user && context.user.role) {
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
