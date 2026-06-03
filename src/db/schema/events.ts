import { user } from "@/db/schema";
import { statusEnum, visibleEnum, type InferResultType } from "@/db/schema/_common";
import { Roles } from "@/lib/auth/roles";
import { sql } from "drizzle-orm";
import { boolean, index, pgTable, text, timestamp, uniqueIndex, uuid } from "drizzle-orm/pg-core";

// Stores all the events which the team will host or participate.
export const dbEvent = pgTable(
  "event",
  {
    // id is the identifier of the individual version of an Event as it moves through different
    // mutations. Each mutation or edit of an Event will get a new id while code should
    // remain unchanged.
    id: uuid("id").primaryKey().defaultRandom(),

    // code represents the identifier for the Event as a whole. code is established when an
    // Event is first created and remains with the Event throughout its lifecycle.
    code: uuid("code").notNull(),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    createdBy: text("created_by_user_id")
      .notNull()
      .references(() => user.id, { onDelete: "no action" }),
    active: boolean().default(true),
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
  },
  (table) => [
    index("idx_event_status").on(table.status),
    index("idx_event_visibleTo").on(table.visibleTo),
    uniqueIndex("ux_event_active")
      .on(table.code, table.active)
      .where(sql`${table.active} = true`),
  ],
);

// Stores the date ranges of events. In most cases, there will be a single date range.
export const dbEventDate = pgTable(
  "event_date",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    eventId: uuid("event_id").references(() => dbEvent.id, { onDelete: "cascade" }),
    startAt: timestamp("start_at").notNull(),
    endAt: timestamp("end_at").notNull(),
  },
  (table) => [
    index("idx_event_date_calendar_id").on(table.eventId),
    index("idx_event_date_range").on(table.startAt, table.endAt),
  ],
);

// Export inferred types so they can be used throughout the application.
export type EventSelectItem = typeof dbEvent.$inferSelect;
export type EventInsertItem = typeof dbEvent.$inferInsert;
export type EventItemStatus = typeof dbEvent.$inferSelect.status;
export type EventItemVisibleTo = typeof dbEvent.$inferSelect.visibleTo;
export type EventWithDatesSelect = InferResultType<"dbEvent", { dates: true }>;
