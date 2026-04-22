// auth/server.ts
import { normalizeRoles } from "@/lib/auth/normalize";
import { getPermissionsForRoles } from "@/lib/auth/permissions";
import type { AppSession } from "@/lib/auth/session";
import type { getSessionFn } from "../server-functions";

type UserSession = Awaited<ReturnType<typeof getSessionFn>>;

export async function createAppSession(
  userSession: UserSession,
): Promise<AppSession> {
  // Extract Roles and Permissions.
  const roles = normalizeRoles(userSession!.user.role);
  const permissions = getPermissionsForRoles(roles);

  return {
    user: {
      id: userSession!.user.id,
      name: userSession!.user.name,
      roles,
      permissions,
    },
  };
}
