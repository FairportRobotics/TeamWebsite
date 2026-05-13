// prettier-ignore
import { db } from "@/db";
import { account as dbAccounts, session as dbSessions, user as dbUsers } from "@/db/schema";
import { Permissions } from "@/lib/auth/permissions";
import { anyPermissionMiddleware } from "@/server/middleware/anyPermission";
import { authenticatedMiddleware } from "@/server/middleware/authenticated";
import { createServerFn } from "@tanstack/react-start";
import { count, eq, max } from "drizzle-orm";

// Gets a list of all users.
export type UserListItem = Awaited<ReturnType<typeof getListForAdminFn>>[0];
export const getListForAdminFn = createServerFn()
  .middleware([authenticatedMiddleware, anyPermissionMiddleware([Permissions.UserViewAll])])
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
