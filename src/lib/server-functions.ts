import { db } from "@/db";
import { account, session } from "@/db/schema";
import { auth } from "@/lib/auth";
import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { gt } from "drizzle-orm";

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
