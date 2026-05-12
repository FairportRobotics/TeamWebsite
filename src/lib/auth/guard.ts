// prettier-ignore
import type { Permission } from "@/lib/auth/permissions";
import { RolePermissions, Roles, type Role } from "@/lib/auth/roles";

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

function hasAllPermissionsTyped(userRoles: Role[], required: readonly Permission[]): boolean {
  const userPerms = getPermissionsForRoles(userRoles);
  return required.every((perm) => userPerms.has(perm));
}

function hasAnyPermissionsTyped(userRoles: Role[], required: readonly Permission[]): boolean {
  const userPerms = getPermissionsForRoles(userRoles);
  return required.some((perm) => userPerms.has(perm));
}

function hasPermissionTyped(userRoles: Role[], required: Permission): boolean {
  const userPerms = getPermissionsForRoles(userRoles);
  return [required].some((perm) => userPerms.has(perm));
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
  return hasAnyPermissionsTyped(roles, required);
}

export function hasPermission(roleString: string | null | undefined, required: Permission) {
  const roles = parseRoles(roleString);
  return hasPermissionTyped(roles, required);
}
