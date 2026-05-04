import type { Permission, Role } from "@/lib/auth/permissions";
import { RolePermissions, Roles } from "@/lib/auth/permissions";
import { redirect } from "@tanstack/react-router";

// Parse the delimited roles string into Role objects so we can assure type safety.
const ALL_ROLES = Object.values(Roles);
export function parseRoles(roleString: string | null | undefined): Role[] {
  if (!roleString) return [];

  return roleString
    .split(",")
    .map((r) => r.trim().toLowerCase())
    .filter((r): r is Role => ALL_ROLES.includes(r as Role));
}

// Get all permissions for a set of roles
function getPermissionsForRoles(roles: Role[]): Set<Permission> {
  const perms = new Set<Permission>();

  for (const role of roles) {
    const rolePerms = RolePermissions[role];
    for (const perm of rolePerms) {
      perms.add(perm);
    }
  }

  return perms;
}

export function withPermissions<TArgs, TResult>(
  required: readonly Permission[],
  handler: (ctx: { user: { roles: Role[] } } & TArgs) => Promise<TResult>,
) {
  return async (ctx: { user?: { roles: Role[] } } & TArgs) => {
    if (!ctx.user) {
      throw redirect({ to: "/unauthorized" });
    }

    if (!hasAllPermissionsTyped(ctx.user.roles, required)) {
      throw redirect({ to: "/unauthorized" });
    }

    return handler(ctx as { user: { roles: Role[] } } & TArgs);
  };
}

// Check if user has ALL required permissions.
export function hasAllPermissionsTyped(
  userRoles: Role[],
  required: readonly Permission[],
): boolean {
  const userPerms = getPermissionsForRoles(userRoles);
  return required.every((perm) => userPerms.has(perm));
}

// Optional: check if user has ANY required permissions.
export function hasAnyPermissionTyped(userRoles: Role[], required: readonly Permission[]): boolean {
  const userPerms = getPermissionsForRoles(userRoles);
  return required.some((perm) => userPerms.has(perm));
}

export function hasAllPermissions(
  roleString: string | null | undefined,
  required: readonly Permission[],
) {
  const roles = parseRoles(roleString);
  return hasAllPermissionsTyped(roles, required);
}

export function hasAnyPermission(
  roleString: string | null | undefined,
  required: readonly Permission[],
) {
  const roles = parseRoles(roleString);
  return hasAllPermissionsTyped(roles, required);
}

export function assertHasAllPermissions(
  roleString: string | null | undefined,
  required: readonly Permission[],
) {
  const roles = parseRoles(roleString);

  if (!hasAllPermissionsTyped(roles, required)) {
    throw redirect({ to: "/unauthorized" });
  }
}

export function assertHasAnyPermission(
  roleString: string | null | undefined,
  required: readonly Permission[],
) {
  const roles = parseRoles(roleString);

  if (!hasAllPermissionsTyped(roles, required)) {
    throw redirect({ to: "/unauthorized" });
  }
}
