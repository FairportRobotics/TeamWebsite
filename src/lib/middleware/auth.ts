import { validateRequest } from "@/lib/auth/utils/request";
import { logMiddleware } from "@/lib/middleware/log";
import { redirect } from "@tanstack/react-router";
import { createMiddleware } from "@tanstack/react-start";
import {
  hasAllPermissionsTyped,
  hasAnyPermissionTyped,
  parseRoles,
} from "../auth/utils/permissions";
import type { Permission, Role } from "../permissions";

// Handles checking whether the request is part of an authenticated pipeline and adds context for
// downstream consumers.
export const authenticatedMiddleware = createMiddleware({
  type: "function",
})
  .middleware([logMiddleware])
  .server(async ({ next }) => {
    // Obtain the user.
    const { user } = await validateRequest();

    // Verify the user exists.
    if (!user) {
      throw redirect({ to: "/unauthenticated" });
    }

    // Add desired properties to the context.
    return next({ context: { user: user } });
  });

// Choose behavior: "all" or "any"
type Mode = "all" | "any";

export function requirePermissionsMiddleware(
  required: readonly Permission[],
  mode: Mode = "all",
) {
  return async ({ context, next }: any) => {
    const user = context.user;

    if (!user) {
      throw new Error("Unauthorized");
    }

    const roles: Role[] = parseRoles(user.role);

    const allowed =
      mode === "all"
        ? hasAllPermissionsTyped(roles, required)
        : hasAnyPermissionTyped(roles, required);

    if (!allowed) {
      throw new Error("Forbidden");
    }

    // Continue to handler
    return next({
      context: {
        ...context,
        roles, // optional: pass parsed roles forward
      },
    });
  };
}
