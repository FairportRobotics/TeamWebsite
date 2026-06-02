// prettier-ignore
import { db } from "@/db";
import { calendarDates, calendarTable } from "@/db/schema";
import { Permissions } from "@/lib/auth/permissions";
import { saveCalendarDateSchema, VisibleToOptions } from "@/server/functions/calendar/_common";
import { anyPermissionMiddleware } from "@/server/middleware/anyPermission";
import { authenticatedMiddleware } from "@/server/middleware/authenticated";
import { createServerFn } from "@tanstack/react-start";
import { zodValidator } from "@tanstack/zod-adapter";
import { z } from "zod";

// Create a schema for validating calendar insert and update operations. We can reuse this for
// both operations since they have the same requirements.
export const createCalendarSchema = z
  .object({
    title: z.string().trim().min(1, "Title is required"),
    description: z.string().trim().min(1, "Description is required"),
    location: z.string().trim().min(1, "Location is required"),
    visibleTo: z
      .array(z.enum(VisibleToOptions))
      .min(1, "At least one visibility option must be selected"),
    dates: z.array(saveCalendarDateSchema).min(1, "At least one date range is required"),
    informationLink: z.url().optional().or(z.literal("")),
    signupLink: z.url().optional().or(z.literal("")),
    signupLinkVisibleTo: z.array(z.enum(VisibleToOptions)),
    status: z.string(),
  })
  .refine(
    (data) => {
      // TODO: This is messy but easy to follow.
      if (data.signupLink === undefined) {
        return true;
      } else if (data.signupLink.trim() === "") {
        return true;
      } else if (data.signupLinkVisibleTo.length > 0) {
        return true;
      }

      return false;
    },
    {
      message: "Must select visibility options if signup link is provided",
      path: ["signupLinkVisibleTo"],
    },
  );

// TODO: Validate that the user has permission to perform this action based on the visibility options
// of the calendar item and the user's roles.
export const createCalendarFn = createServerFn()
  .middleware([authenticatedMiddleware, anyPermissionMiddleware([Permissions.EventUpdate])])
  .inputValidator(zodValidator(createCalendarSchema))
  .handler(async ({ data, context }) => {
    try {
      const currentUserId = context!.user!.id;
      const id = crypto.randomUUID();

      // Insert records in a transaction so we can rollback if anything goes sideways.
      await db.transaction(async (tx) => {
        await tx.insert(calendarTable).values({
          id: id,
          title: data.title,
          status: "draft",
          description: data.description ? data.description.split("\n") : undefined,
          visibleTo: data.visibleTo,
          location: data.location,

          informationLink: data.informationLink,
          signupLink: data.signupLink,
          signupLinkVisibleTo: data.signupLinkVisibleTo,

          createdBy: currentUserId,
          updatedBy: currentUserId,
        });

        data.dates.forEach(async (d) => {
          await tx.insert(calendarDates).values({
            calendarId: id,
            startAt: d.startAt,
            endAt: d.endAt,
          });
        });
      });

      return id;
    } catch (error) {
      console.error(error);
    }
  });
