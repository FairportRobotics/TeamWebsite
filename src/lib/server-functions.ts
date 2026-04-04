import { db } from "@/db";
import type { AccountSelect, SessionSelect, UserSelect } from "@/db/schema";
import { account, session, user } from "@/db/schema";
import { auth } from "@/lib/auth";
import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { gt } from "drizzle-orm";

interface AdminUser extends UserSelect {
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

export const getUserSessionsFn = createServerFn({ method: "GET" }).handler(
  async () => {
    const activeSessions = await db
      .select()
      .from(session)
      .where(gt(session.expiresAt, new Date()));
    return activeSessions;
  },
);

export const getUserAccountsFn = createServerFn({ method: "GET" }).handler(
  async () => {
    const accounts = await db.select().from(account);
    return accounts;
  },
);

export const getUsersForAdmin = createServerFn({
  method: "GET",
}).handler(async () => {
  // Retrieve the raw data we need for users, accounts and sessions.
  const users = (await db.select().from(user)) as AdminUser[];
  const accounts = await db.select().from(account);
  const sessions = await db.select().from(session);

  // Associate sessions and accounts with users.
  users.forEach((u) => {
    u.accounts = accounts.filter((a) => a.userId === u.id);
    u.sessions = sessions.filter((s) => s.userId === u.id);
  });

  return users;
});
