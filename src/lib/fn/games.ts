import { db } from "@/db";
import { game as dbGame } from "@/db/schema";
import { createServerFn } from "@tanstack/react-start";
import { zodValidator } from "@tanstack/zod-adapter";
import { desc, eq, max, min } from "drizzle-orm";
import { z } from "zod";
import { authenticatedMiddleware } from "../middlewares";

const getGameYearSchema = z.object({
  year: z.number().default(new Date().getFullYear()),
});

export const getGameYearsExtentsFn = createServerFn({ method: "GET" }).handler(
  async () => {
    const results = await db
      .select({
        minYear: min(dbGame.year),
        maxYear: max(dbGame.year),
      })
      .from(dbGame);

    return { minYear: results[0].minYear, maxYear: results[0].maxYear };
  },
);

export const getGameYearsFn = createServerFn({ method: "GET" }).handler(
  async () => {
    const years = await db.select().from(dbGame).orderBy(desc(dbGame.year));
    return years;
  },
);

export const getGameYearFn = createServerFn()
  .middleware([authenticatedMiddleware])
  .inputValidator(zodValidator(getGameYearSchema))
  .handler(async ({ data }) => {
    const results = await db
      .select()
      .from(dbGame)
      .where(eq(dbGame.year, data.year));

    return results[0];
  });
