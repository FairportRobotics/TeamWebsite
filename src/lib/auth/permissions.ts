import { createAccessControl } from "better-auth/plugins/access";

// Define the resources and the actions needed to manage them.
export const statement = {
  event: [
    "administer",
    "approve",
    "create",
    "delete",
    "read:private",
    "update",
  ],
  game: ["administer", "approve", "create", "delete", "update"],
  robot: ["administer", "create", "delete", "update", "approve"],
  sponsor: ["administer", "approve", "create", "delete", "update"],
  user: [
    "administer",
    "approve",
    "add:parent",
    "add:student",
    "ban",
    "create",
    "delete",
    "impersonate",
    "update",
    "revoke:sessions",
  ],
} as const;

// Create the access control object for Better-Auth.
export const accessControl = createAccessControl(statement);

// Define Roles and their allowed actions.
export const admin = accessControl.newRole({
  event: [
    "administer",
    "approve",
    "create",
    "delete",
    "read:private",
    "update",
  ],
  game: ["administer", "approve", "create", "delete", "update"],
  robot: ["administer", "create", "delete", "update", "approve"],
  sponsor: ["administer", "approve", "create", "delete", "update"],
  user: [
    "administer",
    "approve",
    "add:parent",
    "add:student",
    "ban",
    "create",
    "delete",
    "impersonate",
    "update",
    "revoke:sessions",
  ],
});

export const mentor = accessControl.newRole({
  event: ["administer", "read:private"],
  game: ["administer", "approve"],
  robot: ["administer", "approve"],
  sponsor: ["administer", "approve"],
  user: ["administer", "approve", "add:student", "impersonate"],
});

export const student = accessControl.newRole({
  event: ["read:private"],
  user: ["add:parent"],
});

export const parent = accessControl.newRole({
  event: ["read:private"],
  user: ["add:student"],
});

export const eventModerator = accessControl.newRole({
  event: [
    "administer",
    "approve",
    "create",
    "delete",
    "read:private",
    "update",
  ],
});

export const gameModerator = accessControl.newRole({
  game: ["administer", "approve", "create", "delete", "update"],
});

export const robotModerator = accessControl.newRole({
  robot: ["administer", "create", "delete", "update", "approve"],
});

export const sponsorModerator = accessControl.newRole({
  sponsor: ["administer", "approve", "create", "delete", "update"],
});

export const userModerator = accessControl.newRole({
  user: [
    "administer",
    "approve",
    "add:parent",
    "add:student",
    "ban",
    "create",
    "delete",
    "impersonate",
    "update",
    "revoke:sessions",
  ],
});
