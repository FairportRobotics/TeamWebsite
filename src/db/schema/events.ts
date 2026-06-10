import { user } from "@/db/schema";
import { statusEnum, visibleEnum, type InferResultType } from "@/db/schema/_common";
import { Roles } from "@/lib/auth/roles";
import { index, jsonb, pgSchema, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const eventSchema = pgSchema("event");

// Stores all the Events which the team will host or participate.
export const dbEvent = eventSchema.table("published", {
  id: uuid("id").primaryKey().defaultRandom(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  createdBy: text("created_by_user_id")
    .notNull()
    .references(() => user.id, { onDelete: "no action" }),

  visibleTo: visibleEnum("visible_to").array().default([Roles.Everyone]),
  title: text("title").notNull(),
  description: text("description").notNull(),
  location: text("location").notNull(),
  informationLink: text("information_link"),
  signupLink: text("signup_link"),
  signupLinkVisibleTo: visibleEnum("signup_link_visible_to")
    .array()
    .default([Roles.Student, Roles.Mentor]),
});

// Stores the date ranges of Events. In most cases, there will be a single date range.
export const dbEventDate = eventSchema.table(
  "published_date",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    eventId: uuid("event_id").references(() => dbEvent.id, { onDelete: "cascade" }),
    startAt: timestamp("start_at").notNull(),
    endAt: timestamp("end_at").notNull(),
  },
  (table) => [index("idx_event_date_event_id").on(table.eventId)],
);

// Drafts for Events that are being edited or new and not yet approved.
export const dbEventDraft = eventSchema.table("draft", {
  id: uuid("id").primaryKey().defaultRandom(),
  eventId: uuid("event_id").references(() => dbEvent.id, { onDelete: "cascade" }),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  createdBy: text("created_by_user_id")
    .notNull()
    .references(() => user.id, { onDelete: "no action" }),
  status: statusEnum("status").notNull().default("draft"),
  statusComments: text("status_comments"),

  visibleTo: visibleEnum("visible_to").array().default([Roles.Everyone]),
  title: text("title").notNull(),
  description: text("description").notNull(),
  location: text("location").notNull(),
  informationLink: text("information_link"),
  signupLink: text("signup_link"),
  signupLinkVisibleTo: visibleEnum("signup_link_visible_to")
    .array()
    .default([Roles.Student, Roles.Mentor]),
});

export const dbEventDraftDate = eventSchema.table(
  "draft_date",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    draftId: uuid("draft_id").references(() => dbEventDraft.id, { onDelete: "cascade" }),
    startAt: timestamp("start_at").notNull(),
    endAt: timestamp("end_at").notNull(),
  },
  (table) => [index("idx_event_draft_date_draft_id").on(table.draftId)],
);

// History table that stores changes to Event Draft records.
export const dbEventDraftHistory = eventSchema.table("draft_history", {
  id: uuid("id").primaryKey().defaultRandom(),
  draftId: uuid("draft_id"),
  eventId: uuid("event_id"),
  changedAt: timestamp("changed_at").defaultNow(),
  snapshot: jsonb("snapshot").notNull(),
});

// Export inferred types so they can be used throughout the application.
// export type EventSelectItem = typeof dbEvent.$inferSelect;
// export type EventInsertItem = typeof dbEvent.$inferInsert;
// export type EventItemStatus = typeof dbEvent.$inferSelect.status;
// export type EventItemVisibleTo = typeof dbEvent.$inferSelect.visibleTo;
export type EventWithDatesSelect = InferResultType<"dbEvent", { dates: true }>;
