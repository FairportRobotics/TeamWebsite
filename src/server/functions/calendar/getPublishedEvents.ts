import { db } from "@/db";
import { Permissions } from "@/lib/auth/permissions";
import { anyPermissionMiddleware } from "@/server/middleware/anyPermission";
import { authenticatedMiddleware } from "@/server/middleware/authenticated";
import { createServerFn } from "@tanstack/react-start";

type PublishedEvents = Awaited<ReturnType<typeof getPublishedEventsFn>>;
export type PublishedEvent = NonNullable<PublishedEvents>[0];

export const getPublishedEventsFn = createServerFn()
  .middleware([authenticatedMiddleware, anyPermissionMiddleware([Permissions.EventAdminister])])
  .handler(async () => {
    console.log("getPublishedEventsFn");
    return await db.query.dbEvent.findMany({
      with: {
        dates: true,
        createdBy: true,
      },
    });
  });
