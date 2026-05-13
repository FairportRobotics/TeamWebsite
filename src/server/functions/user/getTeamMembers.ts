// prettier-ignore
import { db } from "@/db";
import { user as dbUsers } from "@/db/schema";
import { createServerFn } from "@tanstack/react-start";
import { like, or } from "drizzle-orm";

// TODO: Refactor once we have a team member table that contains other user information.
export const getTeamMembersFn = createServerFn().handler(async () => {
  const teamMembers = await db
    .select()
    .from(dbUsers)
    .where(or(like(dbUsers.role, "%student%"), like(dbUsers.role, "%mentor%")));

  return teamMembers;
});
