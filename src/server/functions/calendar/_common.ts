import { Roles } from "@/lib/auth/roles";
import { z } from "zod";

// TODO: Refactor to use the InferResultType utility type from _common.ts for better type safety and
// consistency across database query results. This will help ensure that the types of the results we
// get from our database queries are accurate and consistent with our schema definitions.
export const VisibleToOptions = [
  Roles.Everyone,
  Roles.Student,
  Roles.Mentor,
  Roles.Parent,
] as const;

// Create a schema for operations where we need to pass an Event version identifier.
export const eventIdSchema = z.object({
  id: z.string(),
});

// Create a schema for operations where we need to pass an Event code identifier. This is
// the value which identifies every version of an Event as it flows through all its
// mutations.
export const eventCodeSchema = z.object({
  code: z.string(),
});

// Create a schema for validating the date ranges for calendar events. We will use this as a
// nested schema in the main calendar insert and update schema.
export const saveEventDateSchema = z.object({
  id: z.string().optional(), // Optional for insert, required for update
  startAt: z.date(),
  endAt: z.date(),
});
