import { db } from "@/db";
import { gameTable as dbGame, gameTable } from "@/db/schema";
import { seedGames } from "@/db/seed/games";
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

export const seedGameYearsFn = createServerFn({ method: "GET" })
  .middleware([authenticatedMiddleware])
  .handler(async () => {
    seedGames.forEach(async (g) => {
      console.log("🌱 Seeding Year", g.year, g.name);

      try {
        await db.insert(gameTable).values({
          year: g.year,
          name: g.name,
          imageUrl: g.imageUrl,
          gameUrl: g.gameUrl,
        });
      } catch {
        // Do nothing.
      }
    });
  });

export const getGameYearFn = createServerFn()
  .inputValidator(zodValidator(getGameYearSchema))
  .handler(async ({ data }) => {
    const results = await db
      .select()
      .from(dbGame)
      .where(eq(dbGame.year, data.year));

    return results[0];
  });
