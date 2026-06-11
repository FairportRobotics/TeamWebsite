import { db } from "@/db";
import { Permissions } from "@/lib/auth/permissions";
import { anyPermissionMiddleware } from "@/server/middleware/anyPermission";
import { authenticatedMiddleware } from "@/server/middleware/authenticated";
import { createServerFn } from "@tanstack/react-start";

type DraftEvents = Awaited<ReturnType<typeof getDraftEventsFn>>;
export type DraftEvent = NonNullable<DraftEvents>[0];

export const getDraftEventsFn = createServerFn()
  .middleware([authenticatedMiddleware, anyPermissionMiddleware([Permissions.EventAdminister])])
  .handler(async () => {
    console.log("getDraftEventsFn");
    return await db.query.dbEventDraft.findMany({
      with: {
        dates: true,
        createdBy: true,
      },
      orderBy: (events, { asc }) => asc(events.title),
    });
  });
