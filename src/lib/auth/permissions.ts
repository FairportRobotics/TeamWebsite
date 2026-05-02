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
  UserImpersonate: "user:impersonate",
  UserUpdate: "user:update",
  UserRevokeSessions: "user:revoke:sessions",
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

export type Role = (typeof Roles)[keyof typeof Roles];

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
    Permissions.UserImpersonate,
  ],

  student: [Permissions.UserAssociateParent, Permissions.EventReadPrivate],

  parent: [Permissions.UserAssociateStudent, Permissions.EventReadPrivate],

  eventModerator: [
    Permissions.EventAdminister,
    Permissions.EventCreate,
    Permissions.EventUpdate,
    Permissions.EventDelete,
    Permissions.EventApprove,
    Permissions.EventReadPrivate,
  ],

  gameYearModerator: [
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

  sponsorModerator: [
    Permissions.SponsorAdminister,
    Permissions.SponsorCreate,
    Permissions.SponsorUpdate,
    Permissions.SponsorDelete,
    Permissions.SponsorApprove,
  ],

  userModerator: [
    Permissions.UserAdminister,
    Permissions.UserApprove,
    Permissions.UserAssociateParent,
    Permissions.UserAssociateStudent,
    Permissions.UserBan,
    Permissions.UserCreate,
    Permissions.UserDelete,
    Permissions.UserImpersonate,
    Permissions.UserUpdate,
    Permissions.UserRevokeSessions,
  ],
};
