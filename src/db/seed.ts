import * as schema from "@/db/schema";
import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import { game, robot } from "./schema";

// Make sure we're loading the correct .env file and have the DATABASE_URL set.
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

// Protect against accidentally running this script in production.
if (process.env.NODE_ENV === "production") {
  throw new Error("❌ Cannot seed production database");
}

// Create a connection pool to the database.
const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool, { schema });

async function resetDatabase() {
  // Order matters if you have foreign keys
  console.log("🧹 Clearing database...");
  await db.delete(robot).execute();
  await db.delete(game).execute();

  // Now we can seed the database with initial data.
  console.log("🌱 Seeding data...");
  await db.insert(game).values([
    {
      year: 2026,
      name: "Rebuilt",
      image:
        "https://upload.wikimedia.org/wikipedia/en/0/0e/Rebuilt_FRC_Logo.png",
      url: "https://en.wikipedia.org/wiki/Rebuilt_(FIRST)",
    },
    {
      year: 2025,
      name: "Reefscape",
      image:
        "https://upload.wikimedia.org/wikipedia/en/b/b9/Reefscape_FRC_Logo.png",
      url: "https://en.wikipedia.org/wiki/Reefscape",
    },
    {
      year: 2024,
      name: "Crescendo",
      image:
        "https://upload.wikimedia.org/wikipedia/en/thumb/8/88/Crescendo_FRC_Logo.svg/500px-Crescendo_FRC_Logo.svg.png",
      url: "https://en.wikipedia.org/wiki/Crescendo_(FIRST)",
    },
    {
      year: 2023,
      name: "Charged Up",
      image:
        "https://upload.wikimedia.org/wikipedia/en/thumb/b/b7/Charged_Up_Logo.svg/500px-Charged_Up_Logo.svg.png",
      url: "https://en.wikipedia.org/wiki/Charged_Up_(FIRST)",
    },
    {
      year: 2022,
      name: "Rapid React",
      image: "https://en.wikipedia.org/wiki/Rapid_React",
      url: "https://en.wikipedia.org/wiki/Rapid_React",
    },
  ]);

  await db.insert(robot).values([
    {
      id: "2026",
      name: "Boulder",
      gameYear: 2026,
      image: "",
      awards: "",
      specifications: "",
    },
    {
      id: "2025",
      name: "TBD",
      gameYear: 2025,
      image: "",
      awards: "",
      specifications: "",
    },
    {
      id: "2024",
      name: "TBD",
      gameYear: 2024,
      image: "",
      awards: "",
      specifications: "",
    },
    {
      id: "2023",
      name: "TBD",
      gameYear: 2023,
      image: "",
      awards: "",
      specifications: "",
    },
    {
      id: "2022",
      name: "TBD",
      gameYear: 2022,
      image: "",
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
