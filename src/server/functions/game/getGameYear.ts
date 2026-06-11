// prettier-ignore
import { db } from "@/db";
import { gameTable as dbGame } from "@/db/schema";
import { createServerFn } from "@tanstack/react-start";
import { zodValidator } from "@tanstack/zod-adapter";
import { eq } from "drizzle-orm";
import { z } from "zod";

const getGameYearSchema = z.object({
  year: z.number().default(new Date().getFullYear()),
});

export const getGameYearFn = createServerFn()
  .validator(zodValidator(getGameYearSchema))
  .handler(async ({ data }) => {
    const results = await db.select().from(dbGame).where(eq(dbGame.year, data.year));

    return results[0];
  });
