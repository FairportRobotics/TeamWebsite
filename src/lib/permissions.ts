type UserType = "coach" | "mentor" | "student" | "parent" | "user" | "guest";

type Permission =
  | "events.manage"
  | "events.approve"
  | "robots.manage"
  | "robots.approve"
  | "sponsors.manage"
  | "sponsors.approve"
  | "team-members.manage"
  | "team-members.approve"
  | "users.view"
  | "users.manage"
  | "users.approve"
  | "users.impersonate"
  | "students.associate";

const UserPermissions = {
  coach: [
    "events.manage",
    "events.approve",
    "robots.manage",
    "robots.approve",
    "sponsors.manage",
    "sponsors.approve",
    "team-members.manage",
    "team-members.approve",
    "users.view",
    "users.manage",
    "users.approve",
    "students.associate",
  ],
  mentor: [
    "events.manage",
    "events.approve",
    "robots.manage",
    "robots.approve",
    "sponsors.manage",
    "sponsors.approve",
    "team-members.manage",
    "team-members.approve",
    "users.view",
    "users.manage",
    "users.approve",
    "students.associate",
  ],
  student: [
    "events.manage",
    "robots.manage",
    "sponsors.manage",
    "team-members.manage",
  ],
  parent: ["students.associate"],
} as Record<UserType, Permission[]>;

export function hasPermission(
  userType: UserType,
  permission: Permission,
): boolean {
  return UserPermissions[userType].includes(permission);
}
