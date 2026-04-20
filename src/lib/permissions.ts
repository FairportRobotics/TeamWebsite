type UserType = "coach" | "mentor" | "student" | "parent" | "visitor";

type Permission =
  | "team.meta.manage"
  | "team.member.manage"
  | "games.draft"
  | "games.manage"
  | "calendar.draft"
  | "calendar.manage"
  | "sponsors.draft"
  | "sponsors.manage"
  | "admin.view"
  | "admin.users.view"
  | "admin.users.impersonate"
  | "admin.users.manage";

type Role = "admin" | "team_manager" | "content_editor" | "member" | "guest";

const rolePermissions: Record<Role, Permission[]> = {
  admin: [
    "team.meta.manage",
    "team.member.manage",
    "games.draft",
    "games.manage",
    "calendar.draft",
    "calendar.manage",
    "admin.view",
    "admin.users.view",
    "admin.users.impersonate",
    "admin.users.manage",
  ],
  team_manager: [
    "team.meta.manage",
    "team.member.manage",
    "games.manage",
    "calendar.manage",
    "admin.view",
  ],
  content_editor: [
    "team.meta.manage",
    "games.draft",
    "games.manage",
    "calendar.draft",
    "calendar.manage",
  ],
  member: ["games.draft", "calendar.draft"],
  guest: [],
};
