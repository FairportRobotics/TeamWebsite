import { hasAllPermissions } from "@/lib/auth/guard";
import type { Permission } from "@/lib/auth/permissions";
import { redirect } from "@tanstack/react-router";
import { createMiddleware } from "@tanstack/react-start";
import { sessionMiddleware } from "./session";

export function allPermissionsMiddleware(required: Permission[]) {
  return createMiddleware()
    .middleware([sessionMiddleware])
    .server(async ({ next, context }) => {
      if (!context?.user) {
        throw redirect({ to: "/unauthenticated" });
      }

      if (!hasAllPermissions(context.user.role, required)) {
        throw redirect({ to: "/unauthorized" });
      }

      return next();
    });
}
