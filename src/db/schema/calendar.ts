// drizzle/schema/items.ts
import { integer, pgTable, text, uuid, type AnyPgColumn } from "drizzle-orm/pg-core";
import { statusEnum } from "./_common";

export const calendarTable = pgTable("calendar", {
  id: uuid("id").primaryKey().defaultRandom(),
  rootId: uuid("root_id").references((): AnyPgColumn => calendarTable.id), // Links to original version
  parentId: uuid("parent_id").references((): AnyPgColumn => calendarTable.id), // Links to previous version
  version: integer("version").notNull().default(1),
  status: statusEnum("status").notNull().default("draft"),
  title: text("title").notNull(),
  description: text("description").array(),
  // createdBy: text("created_by").notNull(),
  // approvedBy: text("approved_by"),
  // publishedAt: timestamp("published_at"),
  // createdAt: timestamp("created_at").defaultNow(),
  // updatedAt: timestamp("updated_at").defaultNow(),
});

// export type CalendarSelectItem = typeof calendarTable.$inferSelect;
// export type CalendarInsertItem = typeof calendarTable.$inferInsert;

// export const calendarInsertSchema = createInsertSchema(calendarTable);
// export const calendarSelectSchema = createSelectSchema(calendarTable);
