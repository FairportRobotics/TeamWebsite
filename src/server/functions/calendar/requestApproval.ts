import { db } from "@/db";
import { dbEventDraft, dbEventDraftHistory } from "@/db/schema";
import { Permissions } from "@/lib/auth/permissions";
import { eventIdSchema } from "@/server/functions/calendar/_common";
import { anyPermissionMiddleware } from "@/server/middleware/anyPermission";
import { authenticatedMiddleware } from "@/server/middleware/authenticated";
import { createServerFn } from "@tanstack/react-start";
import { zodValidator } from "@tanstack/zod-adapter";
import { eq } from "drizzle-orm";

export const requestApprovalCalendarFn = createServerFn()
  .middleware([authenticatedMiddleware, anyPermissionMiddleware([Permissions.EventUpdate])])
  .validator(zodValidator(eventIdSchema))
  .handler(async ({ data, context }) => {
    const currentUserId = context!.user!.id;

    try {
      // Insert records in a transaction so we can rollback if anything goes sideways.
      await db.transaction(async (tx) => {
        // Retrieve the current version of the Draft.
        const existingDraft = await tx.query.dbEventDraft.findFirst({
          where: eq(dbEventDraft.id, data.id),
          with: {
            dates: true,
            createdBy: true,
          },
        });

        if (!existingDraft) throw new Error("Event draft not found");

        // Create a history record of the draft.
        await tx.insert(dbEventDraftHistory).values({
          draftId: existingDraft.id,
          snapshot: existingDraft,
        });

        // Update the Draft.
        await tx
          .update(dbEventDraft)
          .set({
            status: "pending",
            createdBy: currentUserId,
          })
          .where(eq(dbEventDraft.id, data.id));

        // Return the new version of the Event Draft.
        return await tx.query.dbEventDraft.findFirst({
          where: eq(dbEventDraft.id, data.id),
          with: {
            dates: true,
            createdBy: true,
          },
        });
      });
    } catch (error) {
      console.error(error);
    }
  });
