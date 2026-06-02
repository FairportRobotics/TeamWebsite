import { user } from "@/db/schema";
import { statusEnum, visibleEnum, type InferResultType } from "@/db/schema/_common";
import { Roles } from "@/lib/auth/roles";
import { index, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

// Stores all the events in which the team will host or participate.
export const dbEvent = pgTable(
  "event",
  {
    id: uuid("id").primaryKey().defaultRandom(),

    status: statusEnum("status").notNull().default("draft"),
    visibleTo: visibleEnum("visible_to").array().default([Roles.Everyone]),
    title: text("title").notNull(),
    description: text("description").notNull(),
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
    index("idx_event_status").on(table.status),
    index("idx_event_visibleTo").on(table.visibleTo),
  ],
);

// Stores the date ranges of events. In most cases, there will be a single date range.
export const dbEventDate = pgTable(
  "event_date",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    calendarId: uuid("event_id").references(() => dbEvent.id),
    startAt: timestamp("start_at").notNull(),
    endAt: timestamp("end_at").notNull(),
  },
  (table) => [
    index("idx_event_date_calendar_id").on(table.calendarId),
    index("idx_event_date_range").on(table.startAt, table.endAt),
  ],
);

// Export inferred types so they can be used throughout the application.
export type CalendarSelectItem = typeof dbEvent.$inferSelect;
export type CalendarInsertItem = typeof dbEvent.$inferInsert;
export type CalendarItemStatus = typeof dbEvent.$inferSelect.status;
export type CalendarItemVisibleTo = typeof dbEvent.$inferSelect.visibleTo;
export type CalendarWithDatesSelect = InferResultType<"dbEvent", { dates: true }>;
