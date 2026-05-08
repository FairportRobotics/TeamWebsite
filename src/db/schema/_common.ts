import { pgEnum } from "drizzle-orm/pg-core";

import * as schema from "@/db/schema";
import {
  type BuildQueryResult,
  type DBQueryConfig,
  type ExtractTablesWithRelations,
} from "drizzle-orm";

type Schema = typeof schema;
type TSchema = ExtractTablesWithRelations<Schema>;

export type InferResultType<
  TableName extends keyof TSchema,
  With extends
    | DBQueryConfig<"one" | "many", boolean, TSchema, TSchema[TableName]>["with"]
    | undefined = undefined,
> = BuildQueryResult<TSchema, TSchema[TableName], { with: With }>;

export const statusEnum = pgEnum("item_status", [
  "draft",
  "pending_review",
  "published",
  "archived",
]);
