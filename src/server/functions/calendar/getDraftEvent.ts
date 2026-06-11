import { db } from "@/db";
import { dbEventDraft } from "@/db/schema";
import { Permissions } from "@/lib/auth/permissions";
import { eventIdSchema } from "@/server/functions/calendar/_common";
import { anyPermissionMiddleware } from "@/server/middleware/anyPermission";
import { authenticatedMiddleware } from "@/server/middleware/authenticated";
import { createServerFn } from "@tanstack/react-start";
import { zodValidator } from "@tanstack/zod-adapter";
import { eq } from "drizzle-orm";

export type DraftEvent = Awaited<ReturnType<typeof getDraftEvent>>;

export const getDraftEvent = createServerFn()
  .middleware([authenticatedMiddleware, anyPermissionMiddleware([Permissions.EventAdminister])])
  .validator(zodValidator(eventIdSchema))
  .handler(async ({ data }) => {
    return await db.query.dbEventDraft.findFirst({
      where: eq(dbEventDraft.id, data.id),
      with: {
        dates: true,
        createdBy: true,
      },
    });
  });
