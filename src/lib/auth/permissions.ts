// src/lib/permissions.ts
import { createAccessControl } from "better-auth/plugins/access";

// Define the permissions and their names.
export const Permissions = {
  EventAdminister: "event:administer",
  EventApprove: "event:approve",
  EventCreate: "event:create",
  EventDelete: "event:delete",
  EventReadPrivate: "event:read:private",
  EventUpdate: "event:update",

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
  UserBan: "user:ban",
  UserCreate: "user:create",
  UserDelete: "user:delete",
  UserImpersonate: "user:inpersonate",
  UserUpdate: "user:update",
} as const;

// Define all resources and their possible actions.
export const statement = {
  event: [
    Permissions.EventAdminister,
    Permissions.EventCreate,
    Permissions.EventUpdate,
    Permissions.EventDelete,
    Permissions.EventApprove,
    Permissions.EventReadPrivate,
  ],

  gameYear: [
    Permissions.GameYearAdminister,
    Permissions.GameYearCreate,
    Permissions.GameYearUpdate,
    Permissions.GameYearDelete,
    Permissions.GameYearApprove,
    Permissions.GameYearRobotCreate,
    Permissions.GameYearRobotUpdate,
    Permissions.GameYearRobotDelete,
    Permissions.GameYearRobotApprove,
  ],

  sponsor: [
    Permissions.SponsorAdminister,
    Permissions.SponsorCreate,
    Permissions.SponsorUpdate,
    Permissions.SponsorDelete,
    Permissions.SponsorApprove,
  ],

  user: [
    Permissions.UserAdminister,
    Permissions.UserApprove,
    Permissions.UserAssociateParent,
    Permissions.UserAssociateStudent,
    Permissions.UserBan,
    Permissions.UserCreate,
    Permissions.UserDelete,
    Permissions.UserImpersonate,
    Permissions.UserUpdate,
  ],
} as const;

export const ac = createAccessControl(statement);

// Define roles with their allowed actions.
export const student = ac.newRole({
  user: [Permissions.UserAssociateParent],
  event: [Permissions.EventReadPrivate, Permissions.EventAdminister],
  gameYear: [Permissions.GameYearAdminister],
  sponsor: [Permissions.SponsorAdminister],
});

export const parent = ac.newRole({
  user: [Permissions.UserAssociateStudent],
  event: [Permissions.EventReadPrivate],
});

export const moderator = ac.newRole({
  user: [
    Permissions.UserAdminister,
    Permissions.UserApprove,
    Permissions.UserAssociateStudent,
  ],
  event: [Permissions.EventAdminister, Permissions.EventReadPrivate],
  gameYear: [
    Permissions.GameYearAdminister,
    Permissions.GameYearCreate,
    Permissions.GameYearUpdate,
    Permissions.GameYearDelete,
    Permissions.GameYearApprove,
    Permissions.GameYearRobotCreate,
    Permissions.GameYearRobotUpdate,
    Permissions.GameYearRobotDelete,
    Permissions.GameYearRobotApprove,
  ],
  sponsor: [
    Permissions.SponsorAdminister,
    Permissions.SponsorCreate,
    Permissions.SponsorUpdate,
    Permissions.SponsorDelete,
    Permissions.SponsorApprove,
  ],
});

export const admin = ac.newRole({
  event: [
    Permissions.EventAdminister,
    Permissions.EventCreate,
    Permissions.EventUpdate,
    Permissions.EventDelete,
    Permissions.EventApprove,
    Permissions.EventReadPrivate,
  ],

  gameYear: [
    Permissions.GameYearAdminister,
    Permissions.GameYearCreate,
    Permissions.GameYearUpdate,
    Permissions.GameYearDelete,
    Permissions.GameYearApprove,
    Permissions.GameYearRobotCreate,
    Permissions.GameYearRobotUpdate,
    Permissions.GameYearRobotDelete,
    Permissions.GameYearRobotApprove,
  ],

  sponsor: [
    Permissions.SponsorAdminister,
    Permissions.SponsorCreate,
    Permissions.SponsorUpdate,
    Permissions.SponsorDelete,
    Permissions.SponsorApprove,
  ],

  user: [
    Permissions.UserAdminister,
    Permissions.UserApprove,
    Permissions.UserAssociateParent,
    Permissions.UserAssociateStudent,
    Permissions.UserBan,
    Permissions.UserCreate,
    Permissions.UserDelete,
    Permissions.UserImpersonate,
    Permissions.UserUpdate,
  ],
});
