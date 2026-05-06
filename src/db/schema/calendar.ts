// drizzle/schema/items.ts
import { integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const calendarTable = pgTable("calendar", {
  id: uuid("id").primaryKey().defaultRandom(),
  // rootId: uuid("root_id").references(() => itemsTable.id), // Links to original version
  // parentId: uuid("parent_id").references(() => itemsTable.id), // Links to previous version
  version: integer("version").notNull().default(1),
  // status: statusEnum("status").notNull().default("draft"),
  title: text("title").notNull(),
  content: text("content"),
  createdBy: uuid("created_by").notNull(),
  approvedBy: uuid("approved_by"),
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type CalendarSelectItem = typeof calendarTable.$inferSelect;
export type CalendarInsertItem = typeof calendarTable.$inferInsert;

export const calendarInsertSchema = createInsertSchema(calendarTable);
export const calendarSelectSchema = createSelectSchema(calendarTable);
