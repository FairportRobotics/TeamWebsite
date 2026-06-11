import { Roles } from "@/lib/auth/roles";
import { z } from "zod";

// TODO: Refactor to use the InferResultType utility type from _common.ts for better type safety and
// consistency across database query results. This will help ensure that the types of the results we
// get from our database queries are accurate and consistent with our schema definitions.
export const VisibleToOptions = [Roles.Everyone, Roles.Student, Roles.Mentor, Roles.Parent] as const;

// Create a schema for operations where we need to pass an Event identifier.
export const eventIdSchema = z.object({
  id: z.string(),
});
