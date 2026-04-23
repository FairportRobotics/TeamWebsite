import { relations } from "drizzle-orm";
import { index, integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const game = pgTable(
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

export const robot = pgTable(
  "robot",
  {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    gameYear: integer("game_year")
      .notNull()
      .references(() => game.year, { onDelete: "cascade" }),
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

export const sponsor = pgTable(
  "sponsor",
  {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    imageUrl: text("image_url"),
    spnosorUrl: text("sponsor_url"),
    fromYear: integer("from_year")
      .notNull()
      .references(() => game.year, { onDelete: "cascade" }),
    throughYear: integer("through_year").references(() => game.year, {
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

export const gameRelations = relations(game, ({ many }) => ({
  robots: many(robot),
}));

export type GameSelect = typeof game.$inferSelect;
export type GameInsert = typeof game.$inferInsert;
export type RobotSelect = typeof robot.$inferSelect;
export type RobotInsert = typeof robot.$inferInsert;
export type SponsorSelect = typeof sponsor.$inferSelect;
export type SponsorInsert = typeof sponsor.$inferInsert;
