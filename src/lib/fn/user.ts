import { db } from "@/db";
import type { AccountSelect, SessionSelect, UserSelect } from "@/db/schema";
import {
  account as dbAccount,
  session as dbSession,
  user as dbUser,
} from "@/db/schema";
import { Permissions } from "@/lib/auth/permissions";
import { redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { zodValidator } from "@tanstack/zod-adapter";
import { gt } from "drizzle-orm";
import { z } from "zod";
import { authenticatedMiddleware } from "../auth/middlewares";
import { assertHasPermissionFn } from "../auth/server";

export interface AdminUser extends UserSelect {
  accounts: AccountSelect[];
  sessions: SessionSelect[];
}

// Schemas
const banUserSchema = z.object({
  userId: z.string(),
  reason: z.string().trim(),
});

const unbanUserSchema = z.object({
  userId: z.string(),
});

// Retrieves all the users in the system.
export const getUserListFn = createServerFn()
  .middleware([authenticatedMiddleware])
  .handler(async () => {
    const hasPermission = await assertHasPermissionFn({
      data: { requiredPermission: Permissions.UserAdminister },
    });

    if (!hasPermission) {
      throw redirect({ to: "/unauthorized" });
    }

    // Retrieve the raw data we need for users, accounts and sessions.
    const users = (await db.select().from(dbUser)) as AdminUser[];
    const accounts = await db.select().from(dbAccount);
    const sessions = await db
      .select()
      .from(dbSession)
      .where(gt(dbSession.expiresAt, new Date()));

    // Associate sessions and accounts with users.
    users.forEach((u) => {
      u.accounts = accounts.filter((a) => a.userId === u.id);
      u.sessions = sessions.filter((s) => s.userId === u.id);
    });

    return users;
  });

// Functions
export const banUserFn = createServerFn()
  .middleware([authenticatedMiddleware])
  .inputValidator(zodValidator(banUserSchema))
  .handler(async ({ data, context }) => {
    const hasPermission = await assertHasPermissionFn({
      data: { requiredPermission: Permissions.UserBan },
    });

    if (!hasPermission) {
      throw redirect({ to: "/unauthorized" });
    }

    console.log("Ban User", data.userId, data.reason, " by ", context.userId);
  });

export const unbanUserFn = createServerFn()
  .middleware([authenticatedMiddleware])
  .inputValidator(zodValidator(unbanUserSchema))
  .handler(async ({ data, context }) => {
    const hasPermission = await assertHasPermissionFn({
      data: { requiredPermission: Permissions.UserBan },
    });

    if (!hasPermission) {
      throw redirect({ to: "/unauthorized" });
    }

    console.log("UnBan User", data.userId, " by ", context.userId);
  });
