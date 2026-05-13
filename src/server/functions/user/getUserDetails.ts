// prettier-ignore
import { db } from "@/db";
import { account as dbAccounts, session as dbSessions, user as dbUsers } from "@/db/schema";
import { userIdSchema } from "@/server/functions/user/_common";
import { createServerFn } from "@tanstack/react-start";
import { zodValidator } from "@tanstack/zod-adapter";
import { eq } from "drizzle-orm";

// Get a single User of the system.
export type UserDetailItem = Awaited<ReturnType<typeof getUserDetailsFn>>;
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
