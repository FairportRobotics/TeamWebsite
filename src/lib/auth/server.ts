// prettier-ignore
import type { Permission, Role } from "@/lib/auth/permissions";
import { RolePermissions, Roles } from "@/lib/auth/permissions";
import { validateRequest } from "@/lib/auth/utils/request";
import { redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { z } from "zod";
import { auth } from ".";
import { authenticatedMiddleware } from "../middleware/authenticatedMiddleware";
import { PermissionsArraySchema } from "./permissions";

/**************************************************************************************************
 * Permission and auth helper functions. Note that these should NOT be exposed for use outside this
 * file. We need to force all auth and permission related questions to be handled with server
 * functions so coders do not accidentally introduce exploits by allowing callers to spoof Roles.
 *
 * For example:
 *
 * const isUserAllowed = hasAnyPermission("admin", [Permissions.UserAdminister]);
 *
 * In the case above, we pass the Role instead of retrieving it from the much
 * more secure session.
 **************************************************************************************************/

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

function hasAllPermissions(roleString: string | null | undefined, required: readonly Permission[]) {
  const roles = parseRoles(roleString);
  return hasAllPermissionsTyped(roles, required);
}

function hasAnyPermission(roleString: string | null | undefined, required: readonly Permission[]) {
  const roles = parseRoles(roleString);
  return hasAnyPermissionsTyped(roles, required);
}

export function assertHasAnyPermission(
  roleString: string | null | undefined,
  permissions: readonly Permission[],
) {
  if (!hasAnyPermission(roleString, permissions)) {
    throw redirect({ to: "/unauthorized" });
  }

  return;
}

export function assertHasAllPermissions(
  roleString: string | null | undefined,
  permissions: readonly Permission[],
) {
  if (!hasAllPermissions(roleString, permissions)) {
    throw redirect({ to: "/unauthorized" });
  }

  return;
}

/**************************************************************************************************
 * Permission and auth server functions.
 **************************************************************************************************/
/**
 * Retrieves the session (if any) associated with the current user.
 * @returns {session} A Promise that resolvs to a Session object if authenticated, undefined if not
 * authenticated.
 * @example
 * const result = await getSessionFn();
 */
export const getSessionFn = createServerFn({ method: "GET" }).handler(async () => {
  const headers = getRequestHeaders();
  const currentSession = await auth.api.getSession({ headers });
  return currentSession ?? undefined;
});

/**
 * Determines whether the current user is authenticated or not.
 * @returns {Promise<boolean>} A Promise that resolves to a boolean indicating whether the current
 * user is authenticated or not.
 * @example
 * const isAuthenticated = await isAuthenticatedFn();
 */
export const isAuthenticatedFn = createServerFn().handler(async () => {
  const result = await getSessionFn();
  return !!result?.session;
});

/**
 * Asserts that the visitor is authenticated.
 * @returns {Promise<User>} A Promise that resolves to a hydrated User object.
 * @throws {redirect} Redirect to the /unauthenticated route.
 * @example
 * const user = await assertAuthenticatedFn();
 */
export const assertAuthenticatedFn = createServerFn().handler(async () => {
  const { user } = await validateRequest();
  if (!user) {
    throw redirect({ to: "/unauthenticated" });
  }

  return user;
});

// Validates that one or more Permissions were supplied.
const multiPermissionSchema = z.object({
  permissions: PermissionsArraySchema,
});

/**
 * Checks to see if the current user has any one of the specified permissions
 * @params {Permission[]} Array of Permissions.
 * @returns {boolean} Boolean indicating the user does have one or more of the specified permissions.
 * @example
 * const hasPermission = await hasAnyPermissionFn(
 * {
 *  body: {
 *    permissions: [Permissions.UserAdminister, Permissions.EventsAdminister]
 *  }
 * });
 */
export const hasAnyPermissionFn = createServerFn()
  .middleware([authenticatedMiddleware])
  .inputValidator((data) => multiPermissionSchema.parse(data))
  .handler(async ({ data, context }) => {
    if (!context.user) return false;
    return hasAnyPermission(context.user.role, data.permissions);
  });

/**
 * Checks to see if the current user has all of the specified permissions
 * @params {Permission[]} Array of Permissions.
 * @returns {boolean} Boolean indicating the user does have all of the specified permissions.
 * @example
 * const hasPermission = await hasAllPermissionsFn(
 * {
 *  body: {
 *    permissions: [Permissions.UserAdminister, Permissions.EventsAdminister]
 *  }
 * });
 */
export const hasAllPermissionsFn = createServerFn()
  .middleware([authenticatedMiddleware])
  .inputValidator((data) => multiPermissionSchema.parse(data))
  .handler(async ({ data, context }) => {
    if (!context.user) return false;
    return hasAllPermissions(context.user.role, data.permissions);
  });

/**
 * Checks to see if the current user has any one of the specified permissions
 * @params {Permission[]} Array of Permissions.
 * @returns {boolean} Boolean indicating the user does have one or more of the specified permissions.
 * @throws {redirect} Throws a redirect to the /unauthorized route.
 * @example
 * const hasPermission = await assertHasAnyPermissionFn(
 * {
 *  body: {
 *    permissions: [Permissions.UserAdminister, Permissions.EventsAdminister]
 *  }
 * });
 */
export const assertHasAnyPermissionFn = createServerFn()
  .middleware([authenticatedMiddleware])
  .inputValidator((data) => multiPermissionSchema.parse(data))
  .handler(async ({ data, context }) => {
    if (!context.user) return false;
    if (!hasAnyPermission(context.user.role, data.permissions)) {
      throw redirect({ to: "/unauthorized" });
    }

    return true;
  });

/**
 * Checks to see if the current user has all of the specified permissions
 * @params {Permission[]} Array of Permissions.
 * @returns {boolean} Boolean indicating the user does have all of the specified permissions.
 * @throws {redirect} Throws a redirect to the /unauthorized route.
 * @example
 * const hasPermission = await assertHasAllPermissionsFn(
 * {
 *  body: {
 *    permissions: [Permissions.UserAdminister, Permissions.EventsAdminister]
 *  }
 * });
 */
export const assertHasAllPermissionsFn = createServerFn()
  .middleware([authenticatedMiddleware])
  .inputValidator((data) => multiPermissionSchema.parse(data))
  .handler(async ({ data, context }) => {
    if (!context.user) return false;
    if (!hasAllPermissions(context.user.role, data.permissions)) {
      throw redirect({ to: "/unauthorized" });
    }

    return true;
  });
