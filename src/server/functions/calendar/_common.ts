import { Roles } from "@/lib/auth/roles";
import { z } from "zod";

// Create a schema for operations where we need to pass a calendar identifier.
export const calendarIdSchema = z.object({
  id: z.string(),
});

// TODO: Refactor to use the InferResultType utility type from _common.ts for better type safety and
// consistency across database query results. This will help ensure that the types of the results we
// get from our database queries are accurate and consistent with our schema definitions.
export const VisibleToOptions = [
  Roles.Everyone,
  Roles.Student,
  Roles.Mentor,
  Roles.Parent,
] as const;

// Create a schema for validating the date ranges for calendar events. We will use this as a
// nested schema in the main calendar insert and update schema.
export const saveCalendarDateSchema = z.object({
  id: z.string().optional(), // Optional for insert, required for update
  startAt: z.date(),
  endAt: z.date(),
});

// Create a schema for validating calendar insert and update operations. We can reuse this for
// both operations since they have the same requirements.
export const saveCalendarSchema = z
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

// Create a schema for validating calendar insert and update operations. We can reuse this for
// both operations since they have the same requirements.
export const updateCalendarSchema = z
  .object({
    id: z.string(),
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
