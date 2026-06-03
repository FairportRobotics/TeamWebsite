import { pgEnum } from "drizzle-orm/pg-core";

import * as schema from "@/db/schema";
import { Roles } from "@/lib/auth/roles";
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

/**
 * Defines the status options for various entities.
 */
export const statusEnum = pgEnum("item_status", ["draft", "pending", "approved", "archived"]);

export type StatusEnumType = (typeof statusEnum.enumValues)[number];

/**
 * Define enums specific to the Calendar-related tables.
 */
export const visibleEnum = pgEnum("event_visible", [
  Roles.Everyone,
  Roles.Student,
  Roles.Mentor,
  Roles.Parent,
]);

export type VisibleEnumType = (typeof visibleEnum.enumValues)[number];
