import { relations } from "drizzle-orm";
import {
  boolean,
  index,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  type AnyPgColumn,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { user } from "./better-auth";

export const statusEnum = pgEnum("status", ["draft", "pending_review", "published", "archived"]);

export const memberTable = pgTable(
  "member",
  {
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "no action" }),
    positions: text("position"),
    bio: text("bio"),
    active: boolean("active").default(true),
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
      .references(() => gameTable.year, { onDelete: "no action" }),
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

export const eventVisibilityEnum = pgEnum("event_visibile", [
  "all",
  "team_members",
  "team_members_and_parents",
]);

export const eventsTable = pgTable("events", {
  id: text("id").primaryKey(),
  rootId: text("root_id").references((): AnyPgColumn => eventsTable.id),
  parentId: text("parent_id").references((): AnyPgColumn => eventsTable.id),
  version: integer("version").notNull().default(1),
  status: statusEnum("status").notNull().default("draft"),

  title: text("title").notNull(),
  description: text("description").array().notNull(),
  startAt: timestamp("start_at").notNull(),
  endAt: timestamp("end_at").notNull(),
  visibleTo: eventVisibilityEnum("event_visible_to").notNull().default("team_members"),

  informationLink: text("information_link"),

  signupLink: text("signup_link"),
  signupLinkVisibleTo: eventVisibilityEnum("signup_link_visible_to")
    .notNull()
    .default("team_members"),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  createdBy: text("created_by_user_id")
    .notNull()
    .references(() => user.id, { onDelete: "no action" }),

  approvedAt: timestamp("approved_at").defaultNow().notNull(),
  approvedBy: text("approved_by_user_id").references(() => user.id, { onDelete: "no action" }),

  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

// Define relationships.
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
export type EventSelect = typeof eventsTable.$inferSelect;

export const EventInsertSchema = createInsertSchema(eventsTable);

export const EventSelectSchema = createSelectSchema(eventsTable);
