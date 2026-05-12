// prettier-ignore
import { db } from "@/db";
import { calendarTable } from "@/db/schema";
import { authenticatedMiddleware } from "@/server/middleware/authenticated";
import { createServerFn } from "@tanstack/react-start";
import { zodValidator } from "@tanstack/zod-adapter";
import { eq } from "drizzle-orm";
import { calendarIdSchema } from "./_common";

export const approveRequest = createServerFn()
  .middleware([authenticatedMiddleware])
  .inputValidator(zodValidator(calendarIdSchema))
  .handler(async ({ data, context }) => {
    if (!context.user) {
      return false;
    }

    await db
      .update(calendarTable)
      .set({
        updatedBy: context.user.id,
        status: "published",
      })
      .where(eq(calendarTable.id, data.id));

    return true;
  });
