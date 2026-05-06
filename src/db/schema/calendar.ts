// drizzle/schema/items.ts
import {
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  type AnyPgColumn,
} from "drizzle-orm/pg-core";
import { user } from "../schema";
import { statusEnum } from "./_common";

export const visibleEnum = pgEnum("calendar_visible", [
  "all",
  "team_members",
  "team_members_and_parents",
]);

export const calendarTable = pgTable("calendar", {
  id: uuid("id").primaryKey().defaultRandom(),
  rootId: uuid("root_id").references((): AnyPgColumn => calendarTable.id), // Links to original version
  parentId: uuid("parent_id").references((): AnyPgColumn => calendarTable.id), // Links to previous version
  version: integer("version").notNull().default(1),

  status: statusEnum("status").notNull().default("draft"),
  visibleTo: visibleEnum("visible_to").notNull().default("team_members"),

  title: text("title").notNull(),
  description: text("description").array(),
  startAt: timestamp("start_at").notNull(),
  endAt: timestamp("end_at").notNull(),

  informationLink: text("information_link"),

  signupLink: text("signup_link"),
  signupLinkVisibleTo: visibleEnum("signup_link_visible_to").notNull().default("team_members"),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  createdBy: text("created_by_user_id")
    .notNull()
    .references(() => user.id, { onDelete: "no action" }),

  approvedAt: timestamp("approved_at"),
  approvedBy: text("approved_by_user_id").references(() => user.id, { onDelete: "no action" }),

  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export type CalendarSelectItem = typeof calendarTable.$inferSelect;
export type CalendarInsertItem = typeof calendarTable.$inferInsert;
export type CalendarItemStatus = typeof calendarTable.$inferSelect.status;
export type CalendarItemVisibleTo = typeof calendarTable.$inferSelect.visibleTo;
