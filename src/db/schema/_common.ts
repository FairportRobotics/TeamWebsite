import { pgEnum } from "drizzle-orm/pg-core";

export const statusEnum = pgEnum("item_status", [
  "draft",
  "pending_review",
  "published",
  "archived",
]);
