import { commonEventSchema } from "@/features/admin/events/_common/common-event.schema";
import { z } from "zod";

export const updatePublishedEventSchema = z.object({
  id: z.string(),
  eventId: z.string(),
  ...commonEventSchema.shape,
});
