// Moved relations into a file to prevent circular references.
import { account, calendarDates, calendarTable, session, user } from "@/db/schema";
import { relations } from "drizzle-orm";

export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account),
  calendarsByCreated: many(calendarTable, {
    relationName: "calendarCreatedBy",
  }),
  calendarsByUpdated: many(calendarTable, {
    relationName: "calendarUpdatedBy",
  }),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}));

export const calendarRelations = relations(calendarTable, ({ many, one }) => ({
  dates: many(calendarDates),
  createdBy: one(user, {
    fields: [calendarTable.createdBy],
    references: [user.id],
    relationName: "calendarCreatedBy",
  }),
  updatedBy: one(user, {
    fields: [calendarTable.updatedBy],
    references: [user.id],
    relationName: "calendarUpdatedBy",
  }),
}));

export const calendarDatesRelations = relations(calendarDates, ({ one }) => ({
  event: one(calendarTable, {
    fields: [calendarDates.calendarId],
    references: [calendarTable.id],
  }),
}));
