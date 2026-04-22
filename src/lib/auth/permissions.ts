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

export type Role = (typeof Roles)[keyof typeof Roles];

// Map roles → permissions
export const RolePermissions: Record<Role, Permission[]> = {
  // Note that this permission is special. It is the ONLY means by which Better-Auth will allow us
  // to perform various operations such as creating users, managing user roles, banning/unbanning
  // users, impersonating users, and more. Applying the "user:*" permissions to our custom roles
  // IS NOT ENOUGH. Merely assign the "admin" role to a user and they will then have the ability
  // to perform those Better-Auth Admin actions. So lame.
  admin: Object.values(Permissions),

  mentor: [
    Permissions.EventAdminister,
    Permissions.GameYearAdminister,
    Permissions.SponsorAdminister,
    Permissions.UserAdminister,
    Permissions.UserAssociateStudent,
    Permissions.EventReadPrivate,
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
    Permissions.UserCreate,
    Permissions.UserDelete,
    Permissions.UserUpdate,
  ],
};
