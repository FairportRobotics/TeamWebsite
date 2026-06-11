// prettier-ignore
import { db } from "@/db";
import { dbEvent } from "@/db/schema";
import { Permissions } from "@/lib/auth/permissions";
import { eventIdSchema } from "@/server/functions/calendar/_common";
import { allPermissionsMiddleware } from "@/server/middleware/allPermissions";
import { authenticatedMiddleware } from "@/server/middleware/authenticated";
import { createServerFn } from "@tanstack/react-start";
import { zodValidator } from "@tanstack/zod-adapter";
import { eq } from "drizzle-orm";

export type EventForEdit = Awaited<ReturnType<typeof getEventForEditFn>>;
export const getEventForEditFn = createServerFn()
  .middleware([authenticatedMiddleware, allPermissionsMiddleware([Permissions.EventUpdate])])
  .validator(zodValidator(eventIdSchema))
  .handler(async ({ data }) => {
    // Retrieve the calendar, the dates and the users who have touched the record.
    const results = await db.query.dbEvent.findFirst({
      where: eq(dbEvent.id, data.id),
      with: {
        dates: true,
        createdBy: true,
      },
    });

    return results;
  });
