import { createAccessControl } from "better-auth/plugins/access";

  GameYearAdminister: "game-year:administer",
  GameYearApprove: "game-year:approve",
  GameYearCreate: "game-year:create",
  GameYearDelete: "game-year:delete",
  GameYearUpdate: "game-year:update",
  GameYearRobotCreate: "game-year:robot:create",
  GameYearRobotDelete: "game-year:robot:delete",
  GameYearRobotUpdate: "game-year:robot:update",
  GameYearRobotApprove: "game-year:robot:approve",

  SponsorAdminister: "sponsor:administer",
  SponsorApprove: "sponsor:approve",
  SponsorCreate: "sponsor:create",
  SponsorDelete: "sponsor:delete",
  SponsorUpdate: "sponsor:update",

  UserAdminister: "user:administer",
  UserApprove: "user:approve",
  UserAssociateParent: "user:associate:parent",
  UserAssociateStudent: "user:associate:student",
  UserCreate: "user:create",
  UserDelete: "user:delete",
  UserUpdate: "user:update",

  AdminUserBan: "user:ban",
  AdminUserImpersonate: "user:impersonate",
  AdminUserRevokeSessions: "user:revoke:sessions",
} as const;

export type Permission = (typeof Permissions)[keyof typeof Permissions];

// Define Roles and their names.
export const Roles = {
  Admin: "admin",
  EventModerator: "eventModerator",
  GameYearModerator: "gameYearModerator",
  SponsorModerator: "sponsorModerator",
  UserModerator: "userModerator",
  Mentor: "mentor",
  Student: "student",
  Parent: "parent",
} as const;

// Create the access control object for Better-Auth.
export const accessControl = createAccessControl(ResourceActions);

// Map roles → permissions
export const RolePermissions: Record<Role, Permission[]> = {
  // Note that the Better-Auth permissions pattern does not really work for us. It's much too
  // inflexible. All we really need to userstand is that in order to use the Admin functions
  // like ban, impersonate and revoke sessions, we just need to assign users to the "admin" role.
  admin: Object.values(Permissions),

  mentor: [
    Permissions.EventAdminister,
    Permissions.GameYearAdminister,
    Permissions.SponsorAdminister,
    Permissions.UserAdminister,
    Permissions.UserAssociateStudent,
    Permissions.EventReadPrivate,
  ],
});

export const mentor = accessControl.newRole({
  event: ["administer", "read:private"],
  game: ["administer", "approve"],
  robot: ["administer", "approve"],
  sponsor: ["administer", "approve"],
  user: ["administer", "approve", "add:student"],
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

  userModerator: [
    Permissions.UserAdminister,
    Permissions.UserApprove,
    Permissions.UserAssociateParent,
    Permissions.UserAssociateStudent,
    Permissions.UserCreate,
    Permissions.UserDelete,
    Permissions.UserUpdate,
  ],
});
