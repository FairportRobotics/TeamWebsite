import { commonEventSchema } from "@/features/admin/event/_common/common-event.schema";
import { z } from "zod";

export const updateDraftEventSchema = z.object({
  id: z.string().optional().nullable(),
  eventId: z.string().optional().nullable(),
  ...commonEventSchema.shape,
});
