import { db } from "@/db";
import { dbEvent } from "@/db/schema";
import { Permissions } from "@/lib/auth/permissions";
import { eventIdSchema } from "@/server/functions/calendar/_common";
import { anyPermissionMiddleware } from "@/server/middleware/anyPermission";
import { authenticatedMiddleware } from "@/server/middleware/authenticated";
import { createServerFn } from "@tanstack/react-start";
import { zodValidator } from "@tanstack/zod-adapter";
import { eq } from "drizzle-orm";

export type PublishedEvent = Awaited<ReturnType<typeof getPublishedEventFn>>;

export const getPublishedEventFn = createServerFn()
  .middleware([authenticatedMiddleware, anyPermissionMiddleware([Permissions.EventAdminister])])
  .validator(zodValidator(eventIdSchema))
  .handler(async ({ data }) => {
    return await db.query.dbEvent.findFirst({
      where: eq(dbEvent.id, data.id),
      with: {
        dates: true,
        createdBy: true,
      },
    });
  });
