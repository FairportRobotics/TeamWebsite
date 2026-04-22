import { db } from "@/db";
import type { AccountSelect, SessionSelect, UserSelect } from "@/db/schema";
import {
  account as dbAccount,
  game as dbGame,
  session as dbSession,
  user as dbUser,
} from "@/db/schema";
import { auth } from "@/lib/auth";
import { redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { desc, gt } from "drizzle-orm";

export interface AdminUser extends UserSelect {
  accounts: AccountSelect[];
  sessions: SessionSelect[];
}

export const getSessionFn = createServerFn({ method: "GET" }).handler(
  async () => {
    const headers = getRequestHeaders();
    const currentSession = await auth.api.getSession({ headers });
    return currentSession ?? undefined;
  },
);

export const getUsersForAdmin = createServerFn({
  method: "GET",
}).handler(async () => {
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

export const getGameYearsFn = createServerFn({ method: "GET" }).handler(
  async () => {
    const years = await db.select().from(dbGame).orderBy(desc(dbGame.year));
    return years;
  },
);

export const assertIsAuthenticatedFn = createServerFn({
  method: "GET",
}).handler(async () => {
  const currentSession = await getSessionFn();
  if (!currentSession) throw redirect({ to: "/auth/signin" });
  return currentSession;
});

export const assertHasPermissionFn = createServerFn({ method: "GET" })
  .inputValidator((data: { permission: string }) => data)
  .handler(async ({ data }) => {
    return false;
  });
