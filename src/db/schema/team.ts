import { relations } from "drizzle-orm";
import { index, integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { user } from "./better-auth";

export const memberTable = pgTable(
  "member",
  {
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    position: text("position"),
    bio: text("bio"),
    imageUrl: text("image_url"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("member_idx").on(table.userId)],
);

export const gameTable = pgTable(
  "game",
  {
    year: integer("year").primaryKey(),
    name: text("name").notNull(),
    imageUrl: text("image_url"),
    gameUrl: text("game_url"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("game_idx").on(table.year)],
);

export const robotTable = pgTable(
  "robot",
  {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    gameYear: integer("game_year")
      .notNull()
      .references(() => gameTable.year, { onDelete: "cascade" }),
    imageUrl: text("image_url"),
    specifications: text("specifications"),
    awards: text("awards"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("robot_gameId_idx").on(table.gameYear)],
);

export const sponsorTable = pgTable(
  "sponsor",
  {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    imageUrl: text("image_url"),
    sponsorUrl: text("sponsor_url"),
    provided: text("provided"),
    fromYear: integer("from_year").notNull(),
    throughYear: integer("through_year"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("sponsor_name_idx").on(table.name)],
);

export const gameRelations = relations(gameTable, ({ many }) => ({
  robots: many(robotTable),
}));

// Export types for select queries.
export type GameSelect = typeof gameTable.$inferSelect;
export type GameInsert = typeof gameTable.$inferInsert;
export type RobotSelect = typeof robotTable.$inferSelect;
export type RobotInsert = typeof robotTable.$inferInsert;
export type SponsorSelect = typeof sponsorTable.$inferSelect;
export type SponsorInsert = typeof sponsorTable.$inferInsert;
