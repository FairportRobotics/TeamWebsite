import { db } from "@/db";
import { dbEvent } from "@/db/schema";
import { Permissions } from "@/lib/auth/permissions";
import { anyPermissionMiddleware } from "@/server/middleware/anyPermission";
import { authenticatedMiddleware } from "@/server/middleware/authenticated";
import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";

export type EventListForAdminItem = Awaited<ReturnType<typeof getEventListForAdminFn>>[0];
export const getEventListForAdminFn = createServerFn()
  .middleware([authenticatedMiddleware, anyPermissionMiddleware([Permissions.EventAdminister])])
  .handler(async () => {
    // Query the calendar table and include the child dates.
    const results = await db.query.dbEvent.findMany({
      where: eq(dbEvent.active, true),
      with: {
        dates: true,
        createdBy: true,
      },
    });

    return results;
  });
