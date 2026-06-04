// Moved relations into a file to prevent circular references.
import {
  account,
  dbEvent,
  dbEventDate,
  dbEventDraft,
  dbEventDraftDate,
  session,
  user,
} from "@/db/schema";
import { relations } from "drizzle-orm";

export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account),
  calendarsByCreated: many(dbEvent, {
    relationName: "calendarCreatedBy",
  }),
  calendarsByUpdated: many(dbEvent, {
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

export const eventRelations = relations(dbEvent, ({ many, one }) => ({
  dates: many(dbEventDate),
  createdBy: one(user, {
    fields: [dbEvent.createdBy],
    references: [user.id],
    relationName: "eventCreatedBy",
  }),
}));

export const eventDateRelations = relations(dbEventDate, ({ one }) => ({
  event: one(dbEvent, {
    fields: [dbEventDate.eventId],
    references: [dbEvent.id],
  }),
}));

export const eventDraftRelations = relations(dbEventDraft, ({ many, one }) => ({
  dates: many(dbEventDraftDate),
  createdBy: one(user, {
    fields: [dbEventDraft.createdBy],
    references: [user.id],
    relationName: "eventDraftCreatedBy",
  }),
}));

export const eventDraftDateRelations = relations(dbEventDraftDate, ({ one }) => ({
  eventDraft: one(dbEventDraft, {
    fields: [dbEventDraftDate.draftId],
    references: [dbEventDraft.id],
  }),
}));
