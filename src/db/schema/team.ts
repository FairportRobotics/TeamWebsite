import { relations } from "drizzle-orm";
import { index, integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";

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
    spnosorUrl: text("sponsor_url"),
    fromYear: integer("from_year")
      .notNull()
      .references(() => gameTable.year, { onDelete: "cascade" }),
    throughYear: integer("through_year").references(() => gameTable.year, {
      onDelete: "cascade",
    }),
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
