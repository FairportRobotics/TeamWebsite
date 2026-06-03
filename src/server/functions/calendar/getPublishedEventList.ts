// prettier-ignore
import { db } from "@/db";
import { dbEvent, dbEventDate, visibleEnum, type VisibleEnumType } from "@/db/schema";
import { Roles } from "@/lib/auth/roles";
import { sessionMiddleware } from "@/server/middleware/session";
import { createServerFn } from "@tanstack/react-start";
import { and, arrayOverlaps, eq } from "drizzle-orm";

// TODO: Add support for optional date filtering.
export type EventListItem = Awaited<ReturnType<typeof getPublishedEventListFn>>[0];
export const getPublishedEventListFn = createServerFn()
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
        id: dbEvent.id,
        status: dbEvent.status,
        visibleTo: dbEvent.visibleTo,
        title: dbEvent.title,
        description: dbEvent.description,
        location: dbEvent.location,
        informationLink: dbEvent.informationLink,
        signupLink: dbEvent.signupLink,
        signupLinkVisibleTo: dbEvent.signupLinkVisibleTo,

        startAt: dbEventDate.startAt,
        endAt: dbEventDate.endAt,
      })
      .from(dbEvent)
      .innerJoin(dbEventDate, eq(dbEvent.id, dbEventDate.eventId))
      .where(and(eq(dbEvent.status, "published"), arrayOverlaps(dbEvent.visibleTo, visibleTo)))
      .orderBy(dbEventDate.startAt);

    return results;
  });
