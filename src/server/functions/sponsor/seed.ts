import { db } from "@/db";
import { sponsorTable } from "@/db/schema";
import { seedSponsors } from "@/db/seed/sponsors";
import { Permissions } from "@/lib/auth/permissions";
import { anyPermissionMiddleware } from "@/server/middleware/anyPermission";
import { authenticatedMiddleware } from "@/server/middleware/authenticated";
import { createServerFn } from "@tanstack/react-start";

export const seedSponsorsFn = createServerFn({ method: "POST" })
  .middleware([
    authenticatedMiddleware,
    anyPermissionMiddleware([Permissions.SponsorAdminister, Permissions.SponsorCreate]),
  ])
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
