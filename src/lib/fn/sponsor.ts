import { db } from "@/db";
import { sponsorTable } from "@/db/schema";
import { seedSponsors } from "@/db/seed/sponsors";
import { createServerFn } from "@tanstack/react-start";
import { authenticatedMiddleware } from "../middleware/authenticatedMiddleware";

export const seedSponsorsFn = createServerFn({ method: "GET" })
  .middleware([authenticatedMiddleware])
  .handler(async () => {
    seedSponsors.forEach(async (s) => {
      console.log("🌱 Seeding Sponsors", s.name);

      try {
        await db.insert(sponsorTable).values({
          id: crypto.randomUUID(),
          name: s.name,
          imageUrl: s.imageUrl,
          sponsorUrl: s.sponsorUrl,
          provided: s.provided,
          fromYear: 1900,
        });
      } catch (error) {
        console.log("⚠️ Failed to seed sponsor", s.name);
        console.error(error);
      }
    });
  });

export const getSponsorsFn = createServerFn({ method: "GET" }).handler(async () => {
  const results = await db.select().from(sponsorTable);
  return results;
});
