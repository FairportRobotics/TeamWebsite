import { db } from "@/db";
import { Permissions } from "@/lib/auth/permissions";
import { anyPermissionMiddleware } from "@/server/middleware/anyPermission";
import { authenticatedMiddleware } from "@/server/middleware/authenticated";
import { createServerFn } from "@tanstack/react-start";

type EventListForAdminItem = Awaited<ReturnType<typeof getEventListForAdminFn>>;
export type DraftEventAdminItem = NonNullable<EventListForAdminItem["drafts"]>[0];
export type PublishEventAdminItem = NonNullable<EventListForAdminItem["published"]>[0];

export const getEventListForAdminFn = createServerFn()
  .middleware([authenticatedMiddleware, anyPermissionMiddleware([Permissions.EventAdminister])])
  .handler(async () => {
    // Retrieve Drafts.
    const draftsPromise = db.query.dbEventDraft.findMany({
      with: {
        dates: true,
        createdBy: true,
      },
    });

    // Retrieve Published.
    const publishedPromise = db.query.dbEvent.findMany({
      with: {
        dates: true,
        createdBy: true,
      },
    });

    const [drafts, published] = await Promise.all([draftsPromise, publishedPromise]);

    return { drafts, published };
  });
