// prettier-ignore
import { db } from "@/db";
import { gameTable as dbGame } from "@/db/schema";
import { createServerFn } from "@tanstack/react-start";
import { max, min } from "drizzle-orm";

export const getGameYearsExtentsFn = createServerFn({ method: "GET" }).handler(async () => {
  const results = await db
    .select({
      minYear: min(dbGame.year),
      maxYear: max(dbGame.year),
    })
    .from(dbGame);

  return { minYear: results[0].minYear, maxYear: results[0].maxYear };
});
