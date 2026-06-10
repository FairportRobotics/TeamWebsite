import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

// TODO: Look up that repo that forces a schema for .env.
config({ path: [".env.local", ".env"] });

export default defineConfig({
  out: "./src/db/drizzle",
  schema: "./src/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env["DATABASE_URL"]!,
  },
  schemaFilter: ["public", "event", "auth"],
});
