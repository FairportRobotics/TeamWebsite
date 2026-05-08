// drizzle/schema/items.ts
import { relations } from "drizzle-orm";
import { index, pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { user } from "../schema";
import { statusEnum, type InferResultType } from "./_common";

// Define enumbs specific to the Calendar-related tables.
export const visibleEnum = pgEnum("calendar_visible", [
  "everyone",
  "students",
  "mentors",
  "parents",
]);

// Define table schemas.
export const calendarTable = pgTable("calendar", {
  id: uuid("id").primaryKey().defaultRandom(),

  status: statusEnum("status").notNull().default("draft"),
  visibleTo: visibleEnum("visible_to").array().default(["everyone"]),

  title: text("title").notNull(),
  description: text("description").array(),
  location: text("location").notNull(),

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

export const calendarDates = pgTable(
  "calendar_dates",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    calendarId: uuid("calendar_id").references(() => calendarTable.id),
    startAt: timestamp("start_at").notNull(),
    endAt: timestamp("end_at").notNull(),
  },
  (table) => [
    index("idx_calendar_dates_calendar_id").on(table.calendarId),
    index("idx_event_dates_range").on(table.startAt, table.endAt),
  ],
);

// Define relationships between tables.
export const calendarDateRelations = relations(calendarTable, ({ many }) => ({
  dates: many(calendarDates),
}));

export const eventDatesRelations = relations(calendarDates, ({ one }) => ({
  event: one(calendarTable, {
    fields: [calendarDates.calendarId],
    references: [calendarTable.id],
  }),
}));

// export const userCalendarCreatedRelations = relations(calendarTable, ({ one }) => ({
//   user: one(user, {
//     fields: [calendarTable.createdBy],
//     references: [user.id],
//   }),
// }));

// export const userCalendarUpdatedRelations = relations(calendarTable, ({ one }) => ({
//   user: one(user, {
//     fields: [calendarTable.updatedBy],
//     references: [user.id],
//   }),
// }));

// Export inferred types so they can be used throughout the application.
export type CalendarSelectItem = typeof calendarTable.$inferSelect;
export type CalendarInsertItem = typeof calendarTable.$inferInsert;
export type CalendarItemStatus = typeof calendarTable.$inferSelect.status;
export type CalendarItemVisibleTo = typeof calendarTable.$inferSelect.visibleTo;

// Example Usage:
export type CalendarWithDatesSelect = InferResultType<"calendarTable", { dates: true }>;
