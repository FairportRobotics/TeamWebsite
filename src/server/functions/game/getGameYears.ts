// prettier-ignore
import { db } from "@/db";
import { gameTable as dbGame } from "@/db/schema";
import { createServerFn } from "@tanstack/react-start";
import { desc } from "drizzle-orm";

export const getGameYearsFn = createServerFn({ method: "GET" }).handler(async () => {
  const years = await db.select().from(dbGame).orderBy(desc(dbGame.year));
  return years;
});
