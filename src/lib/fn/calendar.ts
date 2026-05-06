// prettier-ignore
import { db } from "@/db";
import { calendarTable } from "@/db/schema";
import { seedCalendar } from "@/db/seed/calendar";
import { createServerFn } from "@tanstack/react-start";
import { authenticatedMiddleware } from "../middleware/auth";

export const seedCalendarFn = createServerFn()
  .middleware([authenticatedMiddleware])
  .handler(async ({ context }) => {
    seedCalendar.forEach(async (s) => {
      console.log("🌱 Seeding Calendar", s.title);

      try {
        await db.insert(calendarTable).values({
          id: crypto.randomUUID(),
          title: s.title,
          description: s.description,
          startAt: s.startAt,
          endAt: s.endAt,

          informationLink: s.informationLink,
          signupLink: s.signupLink,
          signupLinkVisibleTo: s.signupLinkVisibleTo,

          createdBy: context.user.id,
        });
      } catch (error) {
        console.log("⚠️ Failed to seed calendar item", s.title);
        console.error(error);
      }
    });
  });

// export async function approveItem(itemIds: string[], reviewerId: string) {
//   return db.transaction(async (tx) => {
//     await tx
//       .update(eventsTable)
//       .set({ status: "published", approvedBy: reviewerId, approvedAt: new Date() })
//       .where(and(eq(eventsTable.status, "pending_review"), inArray(eventsTable.id, itemIds)));
//   });
// }

// export async function getPublishedWithDrafts(rootId: string) {
//   return db
//     .select()
//     .from(eventsTable)
//     .where(eq(eventsTable.rootId, rootId))
//     .orderBy(eventsTable.version);
// }

// /******************************************************************************
//  * Handle retrieving Events and Event Drafts
//  *****************************************************************************/
// export const getPublishedEventsFn = createServerFn()
//   .middleware([authenticatedMiddleware])
//   .handler(async () => {
//     // TODO: Filter events based on date.
//     // TODO: Filter events based on visibility.
//     const results = await db.select().from(eventsTable).where(eq(eventsTable.status, "published"));
//     return results;
//   });

// export type EventsPublishedItem = Awaited<ReturnType<typeof getPublishedEventsFn>>[0];

// /******************************************************************************
//  * Handle retrieving Events and Event Drafts
//  *****************************************************************************/
// export const getEventsForAdminFn = createServerFn()
//   .middleware([authenticatedMiddleware])
//   .handler(async () => {
//     const history = alias(eventsTable, "drafts");

//     const results = await db
//       .select({
//         id: eventsTable.id,
//         version: eventsTable.version,
//         status: eventsTable.status,
//         title: eventsTable.title,
//         description: eventsTable.description,
//         startAt: eventsTable.startAt,
//         endAt: eventsTable.endAt,
//         visibleTo: eventsTable.visibleTo,
//         informationLink: eventsTable.informationLink,
//         signupLink: eventsTable.signupLink,
//         signupLinkVisibleTo: eventsTable.signupLinkVisibleTo,
//         createdAt: eventsTable.createdAt,
//         createdBy: eventsTable.createdBy,
//         approvedAt: eventsTable.approvedAt,
//         approvedBy: eventsTable.approvedBy,
//         updatedAt: eventsTable.updatedAt,
//         history: history,
//       })
//       .from(eventsTable)
//       .where(isNull(eventsTable.parentId))
//       .leftJoin(history, eq(history.parentId, eventsTable.id));

//     return results;
//   });

// export type EventsForAdminItem = Awaited<ReturnType<typeof getEventsForAdminFn>>[0];

// /******************************************************************************
//  * Handle creating Event Drafts
//  *****************************************************************************/
// const EventInputSchema = z.object({
//   title: z.string(),
//   description: z.array(z.string()),
//   startAt: z.coerce.date(),
//   endAt: z.coerce.date(),
//   visibleTo: z.enum(["all", "team_members", "team_members_and_parents"]),

//   informationLink: z.url().optional(),
//   signupLink: z.url().optional(),
//   signupLinkVisibleTo: z.enum(["all", "team_members", "team_members_and_parents"]).optional(),
// });

// export type EventInsertProps = z.infer<typeof EventInputSchema>;

// export const createEventDraftFn = createServerFn()
//   .middleware([authenticatedMiddleware])
//   .inputValidator(zodValidator(EventInputSchema))
//   .handler(async ({ data, context }) => {
//     // TODO: Make sure the caller has permission to do this.

//     // Create the Event and return the new result.
//     const result = await db
//       .insert(eventsTable)
//       .values([
//         {
//           id: crypto.randomUUID(),
//           rootId: null,
//           parentId: null,
//           version: 1,
//           status: "draft",
//           title: data.title,
//           description: data.description,
//           startAt: data.startAt,
//           endAt: data.endAt,
//           visibleTo: data.visibleTo,
//           informationLink: data.informationLink,
//           signupLink: data.signupLink,
//           signupLinkVisibleTo: data.signupLinkVisibleTo,
//           createdBy: context.user.id,
//         },
//       ])
//       .returning();

//     return result;
//   });

// /******************************************************************************
//  * Handle updating Events and Event Drafts
//  *****************************************************************************/
// export const updateEventFn = createServerFn()
//   .middleware([authenticatedMiddleware])
//   .handler(async ({ data }) => {
//     console.log("");
//   });

// /******************************************************************************
//  * Handle approving Event Drafts
//  *****************************************************************************/
// export const approveEventFn = createServerFn()
//   .middleware([authenticatedMiddleware])
//   .handler(async ({ data }) => {
//     console.log("");
//   });
