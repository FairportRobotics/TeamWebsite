// drizzle/schema/items.ts
import { pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { user } from "../schema";
import { statusEnum } from "./_common";

export const visibleEnum = pgEnum("calendar_visible", [
  "everyone",
  "students",
  "mentors",
  "parents",
]);

export const calendarTable = pgTable("calendar", {
  id: uuid("id").primaryKey().defaultRandom(),

  status: statusEnum("status").notNull().default("draft"),
  visibleTo: visibleEnum("visible_to").array().default(["everyone"]),

  title: text("title").notNull(),
  description: text("description").array(),
  location: text("location").notNull(),
  startAt: timestamp("start_at").notNull(),
  endAt: timestamp("end_at").notNull(),

  informationLink: text("information_link"),

  signupLink: text("signup_link"),
  signupLinkVisibleTo: visibleEnum("signup_link_visible_to")
    .array()
    .default(["students", "mentors"]),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  createdBy: text("created_by_user_id")
    .notNull()
    .references(() => user.id, { onDelete: "no action" }),

  updatedBy: text("updated_by_user_id").references(() => user.id, { onDelete: "no action" }),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export type CalendarSelectItem = typeof calendarTable.$inferSelect;
export type CalendarInsertItem = typeof calendarTable.$inferInsert;
export type CalendarItemStatus = typeof calendarTable.$inferSelect.status;
export type CalendarItemVisibleTo = typeof calendarTable.$inferSelect.visibleTo;
