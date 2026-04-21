// src/lib/permissions.ts
import { createAccessControl } from "better-auth/plugins/access";

// Define all resources and their possible actions.
export const statement = {
  team_member: ["create", "update", "delete", "approve"],
  game_year: ["create", "update", "delete", "approve"],
  calendar: ["create", "read.private", "update", "delete", "approve"],
  sponsor: ["create", "update", "delete", "approve"],
  user: [
    "create",
    "update.self",
    "update.other",
    "delete",
    "ban",
    "impersonate",
    "administer",
    "approve",
  ],
} as const;

export const ac = createAccessControl(statement);

// Define roles with their allowed actions.
export const visitor = ac.newRole({
  user: ["update.self"],
});

export const student = ac.newRole({
  team_member: ["create"],
  game_year: ["create"],
  calendar: ["create", "read.private"],
  sponsor: ["create"],
  user: ["update.self"],
});

export const parent = ac.newRole({
  calendar: ["read.private"],
  user: ["update.self"],
});

export const moderator = ac.newRole({
  team_member: ["create", "update", "delete", "approve"],
  game_year: ["create", "update", "delete", "approve"],
  calendar: ["create", "read.private", "update", "delete", "approve"],
  sponsor: ["create", "update", "delete", "approve"],
  user: ["create", "update.self", "update.other", "administer", "approve"],
});

export const admin = ac.newRole({
  team_member: ["create", "update", "delete", "approve"],
  game_year: ["create", "update", "delete", "approve"],
  calendar: ["create", "read.private", "update", "delete", "approve"],
  sponsor: ["create", "update", "delete", "approve"],
  user: [
    "create",
    "update.self",
    "update.other",
    "delete",
    "ban",
    "impersonate",
    "administer",
    "approve",
  ],
});
