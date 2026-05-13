import { z } from "zod";

// Create a schema for operations where we need to pass a calendar identifier.
export const calendarIdSchema = z.object({
  id: z.string(),
});
