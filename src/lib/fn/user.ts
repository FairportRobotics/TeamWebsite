// prettier-ignore
import { db } from "@/db";
import { account as dbAccounts, session as dbSessions, user as dbUsers } from "@/db/schema";
import { authenticatedMiddleware } from "@/lib/middleware/auth";
import { useNavigate, useRouter } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { zodValidator } from "@tanstack/zod-adapter";
import { count, eq, like, max, or } from "drizzle-orm";
import { toast } from "sonner";
import { z } from "zod";
import { authClient } from "../auth/auth-client";

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

const userIdSchema = z.object({
  userId: z.string(),
});

// Get a single User of the system.
export const getUserDetailsFn = createServerFn()
  .inputValidator(zodValidator(userIdSchema))
  .handler(async ({ data }) => {
    const [user, accounts, sessions] = await Promise.all([
      db
        .select()
        .from(dbUsers)
        .where(eq(dbUsers.id, data.userId))
        .limit(1)
        .then((res) => res[0] || null),
      db.select().from(dbAccounts).where(eq(dbAccounts.userId, data.userId)),
      db.select().from(dbSessions).where(eq(dbSessions.userId, data.userId)),
    ]);

    return { user, accounts, sessions };
  });

export type UserDetailItem = Awaited<ReturnType<typeof getUserDetailsFn>>;

// Get Users who are also Team Members.
export const getTeamMembersFn = createServerFn().handler(async () => {
  const teamMembers = await db
    .select()
    .from(dbUsers)
    .where(or(like(dbUsers.role, "%student%"), like(dbUsers.role, "%mentor%")));

  return teamMembers;
});

// Revoke User Sessions
const revokeUserSessionSchema = z.object({
  sessionToken: z.string(),
});

export const revokeUserSessionFn = createServerFn()
  .inputValidator(zodValidator(revokeUserSessionSchema))
  .handler(async ({ data }) => {
    const sessionToken = data.sessionToken;

    const navigate = useNavigate();

    authClient.admin.revokeUserSession(
      { sessionToken },
      {
        onError: (error) => {
          toast.error(error.error.message || "Failed to revoke user session");
        },
        onSuccess: () => {
          navigate({ to: "/admin/users" });
        },
      },
    );
  });

const revokeAllUserSessionsSchema = z.object({
  userId: z.string(),
});

export const revokeAllUserSessionsFn = createServerFn()
  .inputValidator(zodValidator(revokeAllUserSessionsSchema))
  .handler(async ({ data }) => {
    const userId = data.userId;

    const navigate = useNavigate();

    authClient.admin.revokeUserSessions(
      { userId },
      {
        onError: (error) => {
          toast.error(error.error.message || "Failed to revoke user sessions");
        },
        onSuccess: () => {
          navigate({ to: "/admin/users" });
        },
      },
    );
  });

// Impersonate User
const impersonateUserSchema = z.object({
  userId: z.string(),
});

export const impersonateUserFn = createServerFn()
  .inputValidator(zodValidator(impersonateUserSchema))
  .handler(async ({ data }) => {
    const userId = data.userId;

    const navigate = useNavigate();

    authClient.admin.impersonateUser(
      { userId },
      {
        onError: (error) => {
          toast.error(error.error.message || "Failed to impersonate user");
        },
        onSuccess: () => {
          navigate({ to: "/" });
        },
      },
    );
  });

// Ban User
const banUserSchema = z.object({
  userId: z.string(),
  reason: z.string(),
  expires: z.date().nullable(),
});

export const banUserFn = createServerFn()
  .inputValidator(zodValidator(banUserSchema))
  .handler(async ({ data }) => {
    const userId = data.userId;
    const router = useRouter();

    authClient.admin.banUser(
      { userId: userId, banReason: data.reason },
      {
        onError: (error) => {
          toast.error(error.error.message || "Failed to ban user");
        },
        onSuccess: () => {
          toast.success("User was banned");
          router.invalidate();
        },
      },
    );
  });

// Unban User
const unBanUserSchema = z.object({
  userId: z.string(),
});

export const unbanUserFn = createServerFn()
  .inputValidator(zodValidator(unBanUserSchema))
  .handler(async ({ data }) => {
    const userId = data.userId;
    const router = useRouter();

    authClient.admin.unbanUser(
      { userId },
      {
        onError: (error) => {
          toast.error(error.error.message || "Failed to unban user");
        },
        onSuccess: () => {
          toast.success("User was unbanned");
          router.invalidate();
        },
      },
    );
  });
