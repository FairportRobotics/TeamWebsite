// prettier-ignore
import { db } from "@/db";
import { account as dbAccounts, session as dbSessions, user as dbUsers } from "@/db/schema";
import { authenticatedMiddleware } from "@/lib/middleware/auth";
import { createServerFn } from "@tanstack/react-start";
import { zodValidator } from "@tanstack/zod-adapter";
import { count, eq, like, max, or } from "drizzle-orm";
import { z } from "zod";

// Gets a list of all users.
export const getUserListFn = createServerFn()
  .middleware([authenticatedMiddleware])
  .handler(async () => {
    // Get Users and some associated details.
    const users = await db
      .select({
        id: dbUsers.id,
        name: dbUsers.name,
        email: dbUsers.email,
        role: dbUsers.role,
        banned: dbUsers.banned,
        createdAt: dbUsers.createdAt,
        accountsCount: count(dbAccounts.id),
        sessionsCount: count(dbSessions.id),
        sessionsLatest: max(dbSessions.updatedAt),
      })
      .from(dbUsers)
      .leftJoin(dbSessions, eq(dbUsers.id, dbSessions.userId))
      .leftJoin(dbAccounts, eq(dbUsers.id, dbAccounts.userId))
      .groupBy(
        dbUsers.id,
        dbUsers.name,
        dbUsers.email,
        dbUsers.role,
        dbUsers.banned,
        dbUsers.createdAt,
      );

    return users;
  });

export type UserListItem = Awaited<ReturnType<typeof getUserListFn>>[0];

export const getTeamMembersFn = createServerFn().handler(async () => {
  const teamMembers = await db
    .select()
    .from(dbUsers)
    .where(or(like(dbUsers.role, "%student%"), like(dbUsers.role, "%mentor%")));

  return teamMembers;
});

const getUserSchema = z.object({
  userId: z.string(),
});

export const getTeamMemberFn = createServerFn()
  .inputValidator(zodValidator(getUserSchema))
  .handler(async ({ data }) => {
    const teamMember = await db.select().from(dbUsers).where(eq(dbUsers.id, data.userId));

    return teamMember[0] || null;
  });
