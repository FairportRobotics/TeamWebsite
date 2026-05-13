// prettier-ignore
import { db } from "@/db";
import { gameTable } from "@/db/schema";
import { seedGames } from "@/db/seed/games";
import { authenticatedMiddleware } from "@/server/middleware/authenticated";
import { createServerFn } from "@tanstack/react-start";

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
