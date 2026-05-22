// drizzle/schema/items.ts
import { statusEnum, visibleEnum, type InferResultType } from "@/db/schema/_common";
import { Roles } from "@/lib/auth/roles";
import { index, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { user } from "../schema";

// Stores all the events in which the team will host or participate.
export const calendarTable = pgTable(
  "calendar",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    status: statusEnum("status").notNull().default("draft"),
    visibleTo: visibleEnum("visible_to").array().default([Roles.Everyone]),
    title: text("title").notNull(),
    description: text("description").array(),
    location: text("location").notNull(),
    informationLink: text("information_link"),
    signupLink: text("signup_link"),
    signupLinkVisibleTo: visibleEnum("signup_link_visible_to")
      .array()
      .default([Roles.Student, Roles.Mentor]),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    createdBy: text("created_by_user_id")
      .notNull()
      .references(() => user.id, { onDelete: "no action" }),
    updatedBy: text("updated_by_user_id").references(() => user.id, { onDelete: "no action" }),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [
    index("idx_calendar_status").on(table.status),
    index("idx_calendar_visibleTo").on(table.visibleTo),
  ],
);

// Stores the date ranges of events. In most cases, there will be a single date range.
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

// Export inferred types so they can be used throughout the application.
export type CalendarSelectItem = typeof calendarTable.$inferSelect;
export type CalendarInsertItem = typeof calendarTable.$inferInsert;
export type CalendarItemStatus = typeof calendarTable.$inferSelect.status;
export type CalendarItemVisibleTo = typeof calendarTable.$inferSelect.visibleTo;
export type CalendarWithDatesSelect = InferResultType<"calendarTable", { dates: true }>;
