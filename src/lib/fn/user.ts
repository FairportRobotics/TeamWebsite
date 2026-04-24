// prettier-ignore
import { db } from "@/db";
import type { AccountSelect, SessionSelect, UserSelect } from "@/db/schema";
import { account as dbAccount, session as dbSession, user as dbUser } from "@/db/schema";
import { authenticatedMiddleware } from "@/lib/middleware/auth";
import { createServerFn } from "@tanstack/react-start";
import { zodValidator } from "@tanstack/zod-adapter";
import { eq, gt, like, or } from "drizzle-orm";
import { z } from "zod";

export interface AdminUser extends UserSelect {
  accounts: AccountSelect[];
  sessions: SessionSelect[];
}

export const getUserListFn = createServerFn()
  .middleware([authenticatedMiddleware])
  .handler(async () => {
    // Retrieve the raw data we need for users, accounts and sessions.
    const users = (await db.select().from(dbUser)) as AdminUser[];
    const accounts = await db.select().from(dbAccount);
    const sessions = await db.select().from(dbSession).where(gt(dbSession.expiresAt, new Date()));

    // Associate sessions and accounts with users.
    users.forEach((u) => {
      u.accounts = accounts.filter((a) => a.userId === u.id);
      u.sessions = sessions.filter((s) => s.userId === u.id);
    });

    return users;
  });

export const getTeamMembersFn = createServerFn().handler(async () => {
  const teamMembers = await db
    .select()
    .from(dbUser)
    .where(or(like(dbUser.role, "%student%"), like(dbUser.role, "%mentor%")));

  return teamMembers;
});

const getUserSchema = z.object({
  userId: z.string(),
});

export const getTeamMemberFn = createServerFn()
  .inputValidator(zodValidator(getUserSchema))
  .handler(async ({ data }) => {
    const teamMember = await db.select().from(dbUser).where(eq(dbUser.id, data.userId));

    return teamMember[0] || null;
  });
