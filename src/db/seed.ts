import * as schema from "@/db/schema";
import { gameTable, robotTable } from "@/db/schema";
import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";

// Make sure we're loading the correct .env file and have the DATABASE_URL set.
if (!process.env["DATABASE_URL"]) {
  throw new Error("❌ DATABASE_URL is not set");
}

// Protect against accidentally running this script in production.
if (process.env["NODE_ENV"] === "production") {
  throw new Error("❌ Cannot seed production database");
}

// Create a connection pool to the database.
const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env["DATABASE_URL"],
});

const db = drizzle(pool, { schema });

async function resetDatabase() {
  // Order matters if you have foreign keys
  console.log("🧹 Clearing database...");
  await db.delete(robotTable).execute();
  await db.delete(gameTable).execute();

  // Now we can seed the database with initial data.
  console.log("🌱 Seeding games...");
  await db.insert(gameTable).values([
    {
      year: 2026,
      name: "Rebuilt",
      imageUrl: "https://upload.wikimedia.org/wikipedia/en/0/0e/Rebuilt_FRC_Logo.png",
      gameUrl: "https://en.wikipedia.org/wiki/Rebuilt_(FIRST)",
    },
    {
      year: 2025,
      name: "Reefscape",
      imageUrl: "https://upload.wikimedia.org/wikipedia/en/b/b9/Reefscape_FRC_Logo.png",
      gameUrl: "https://en.wikipedia.org/wiki/Reefscape",
    },
    {
      year: 2024,
      name: "Crescendo",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/en/thumb/8/88/Crescendo_FRC_Logo.svg/500px-Crescendo_FRC_Logo.svg.png",
      gameUrl: "https://en.wikipedia.org/wiki/Crescendo_(FIRST)",
    },
    {
      year: 2023,
      name: "Charged Up",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/en/thumb/b/b7/Charged_Up_Logo.svg/500px-Charged_Up_Logo.svg.png",
      gameUrl: "https://en.wikipedia.org/wiki/Charged_Up_(FIRST)",
    },
    {
      year: 2022,
      name: "Rapid React",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/en/thumb/0/08/Rapid_React_Logo.svg/250px-Rapid_React_Logo.svg.png",
      gameUrl: "https://en.wikipedia.org/wiki/Rapid_React",
    },
    {
      year: 2021,
      name: "Infinite Recharge (2021)",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/en/thumb/2/2b/Infinite_Recharge_Logo.png/250px-Infinite_Recharge_Logo.png",
      gameUrl: "https://en.wikipedia.org/wiki/Infinite_Recharge_(2021)",
    },
    {
      year: 2020,
      name: "Infinite Recharge",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/en/thumb/2/2b/Infinite_Recharge_Logo.png/250px-Infinite_Recharge_Logo.png",
      gameUrl: "https://en.wikipedia.org/wiki/Infinite_Recharge",
    },
  ]);

  console.log("🌱 Seeding robots...");
  await db.insert(robotTable).values([
    {
      id: "2026",
      name: "Boulder",
      gameYear: 2026,
      imageUrl: "",
      awards: "",
      specifications:
        "* Intake: balls\n* Spindexer: brushes\n* Shooter: More balls\n* Weight: 115 pounds\n* Perimeter: 100 miles",
    },
    {
      id: "2025",
      name: "TBD",
      gameYear: 2025,
      imageUrl: "",
      awards: "",
      specifications: "",
    },
    {
      id: "2024",
      name: "TBD",
      gameYear: 2024,
      imageUrl: "",
      awards: "",
      specifications: "",
    },
    {
      id: "2023",
      name: "TBD",
      gameYear: 2023,
      imageUrl: "",
      awards: "",
      specifications: "",
    },
    {
      id: "2022",
      name: "TBD",
      gameYear: 2022,
      imageUrl: "",
      awards: "",
      specifications: "",
    },
    {
      id: "2021",
      name: "TBD",
      gameYear: 2021,
      imageUrl: "",
      awards: "",
      specifications: "",
    },
    {
      id: "202-",
      name: "TBD",
      gameYear: 2020,
      imageUrl: "",
      awards: "",
      specifications: "",
    },
  ]);

  console.log("✅ Done!");
}

resetDatabase()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => {
    pool.end();
  });
