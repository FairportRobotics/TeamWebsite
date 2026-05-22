// prettier-ignore
import { db } from "@/db";
import { calendarTable } from "@/db/schema";
import { Permissions } from "@/lib/auth/permissions";
import { calendarIdSchema } from "@/server/functions/calendar/_common";
import { anyPermissionMiddleware } from "@/server/middleware/anyPermission";
import { authenticatedMiddleware } from "@/server/middleware/authenticated";
import { createServerFn } from "@tanstack/react-start";
import { zodValidator } from "@tanstack/zod-adapter";
import { eq } from "drizzle-orm";

export const requestApprovalCalendarFn = createServerFn()
  .middleware([authenticatedMiddleware, anyPermissionMiddleware([Permissions.EventUpdate])])
  .inputValidator(zodValidator(calendarIdSchema))
  .handler(async ({ data, context }) => {
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
