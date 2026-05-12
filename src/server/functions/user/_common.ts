import { z } from "zod";

export const userIdSchema = z.object({
  userId: z.string(),
});

export const sessionTokenSchema = z.object({
  sessionToken: z.string(),
});
