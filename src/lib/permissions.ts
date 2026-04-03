export const PERMISSIONS = {
  events: {
    view: "events.view",
    manage: "events.manage",
    post: "events.post",
  },
  robots: {
    view: "robots.view",
    manage: "robots.manage",
    post: "robots.post",
  },
  team_members: {
    view: "team_members.view",
    manage: "team_members.manage",
    post: "team_members.post",
  },
  sponsors: {
    view: "sponsors.view",
    manage: "sponsors.manage",
    post: "sponsors.post",
  },
  users: {
    view: "users.view",
    manage: "users.manage",
  },
  students: {
    associate: "students.associate",
  },
  parents: {
    associate: "parents.associate",
  },
} as const;

type NestedValues<T> = T extends object ? NestedValues<T[keyof T]> : T;

export type Permission = NestedValues<typeof PERMISSIONS>;

export const ROLES = {
  coach: ["*"],

  mentor: ["*"],

  student: [
    PERMISSIONS.events.view,
    PERMISSIONS.robots.view,
    PERMISSIONS.team_members.view,
    PERMISSIONS.sponsors.view,
    PERMISSIONS.parents.associate,
  ],

  parent: [
    PERMISSIONS.events.view,
    PERMISSIONS.robots.view,
    PERMISSIONS.team_members.view,
    PERMISSIONS.sponsors.view,
    PERMISSIONS.students.associate,
  ],

  user: [
    PERMISSIONS.events.view,
    PERMISSIONS.robots.view,
    PERMISSIONS.team_members.view,
    PERMISSIONS.sponsors.view,
  ],
} as const;

export type Role = keyof typeof ROLES;

export type UserAuth = {
  roles: Role[];
  permissions?: Permission[];
};

export function getUserPermissions(user: UserAuth) {
  const rolePerms = user.roles.flatMap(
    (role) => ROLES[role] as readonly (Permission | "*")[],
  );

  return new Set<Permission | "*">([...rolePerms, ...(user.permissions ?? [])]);
}

export function hasPermission(user: UserAuth, permission: Permission) {
  const perms = getUserPermissions(user);

  return perms.has("*") || perms.has(permission);
}

const user = {
  roles: ["student"],
} as UserAuth;

hasPermission(user, PERMISSIONS.sponsors.post);

/*

export function hasPermission(
  userType: UserType,
  permission: Permission,
): boolean {
  return UserPermissions[userType].includes(permission);
}
*/
