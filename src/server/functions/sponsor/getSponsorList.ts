import { db } from "@/db";
import { sponsorTable } from "@/db/schema";
import { createServerFn } from "@tanstack/react-start";

export const getSponsorListFn = createServerFn({ method: "GET" }).handler(async () => {
  const results = await db.select().from(sponsorTable);
  return results;
});
