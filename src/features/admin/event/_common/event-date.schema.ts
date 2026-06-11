import { z } from "zod";

export const eventDateSchema = z.object({
  id: z.string().optional(),
  startAt: z.date(),
  endAt: z.date(),
});
