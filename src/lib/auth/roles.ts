import { Permissions } from "@/lib/auth//permissions";
import type { Permission } from "@/lib/auth/permissions";

// Define Roles and their names.
export const Roles = {
  Everyone: "everyone",
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

  everyone: [],

  mentor: [
    Permissions.EventAdminister,
    Permissions.GameYearAdminister,
    Permissions.SponsorAdminister,
    Permissions.UserViewAll,
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
    Permissions.UserAssociateParent,
    Permissions.UserAssociateStudent,
    Permissions.UserBan,
    Permissions.UserCreate,
    Permissions.UserEditAny,
    Permissions.UserImpersonate,
    Permissions.UserRevokeSessions,
    Permissions.UserUnban,
    Permissions.UserViewAll,
  ],
};
