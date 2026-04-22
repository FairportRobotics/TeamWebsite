import { RolePermissions, Roles } from "@/lib/auth//permissions";
import type { Permission, Role } from "@/lib/auth/permissions";
import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { auth } from "../auth";

const ALL_ROLES = Object.values(Roles);

// Helper function to filter out garbage data that does not represent an actual Role.
function isRole(value: string): value is Role {
  return ALL_ROLES.includes(value as Role);
}

// Splits the .role delimited string into individual Role values.
export function parseRoles(input: string): Role[] {
  return input
    .split(",")
    .map((r) => r.trim())
    .filter(isRole);
}

// Accepts an array of Roles and collects all the permissions associated with those Roles.
export function getPermissionsForRoles(roles: Role[]): Permission[] {
  return Array.from(new Set(roles.flatMap((role) => RolePermissions[role])));
}

// Accepts the .role string and returns all the permissions associated with all the Roles
// represented.
export function getPermissionsFromRole(
  input: string | null | undefined,
): Permission[] {
  if (!input) return [];
  const roles = parseRoles(input);
  return getPermissionsForRoles(roles);
}

export const validateRequest = createServerFn().handler(async () => {
  const headers = getRequestHeaders();
  const currentSession = await auth.api.getSession({ headers });
  return { user: currentSession?.user ?? undefined };
});
