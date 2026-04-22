import { redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { zodValidator } from "@tanstack/zod-adapter";
import { z } from "zod";
import { authenticatedMiddleware } from "./middlewares";
import type { Permission } from "./permissions";
import { Permissions } from "./permissions";
import { validateRequest } from "./utils";

export const isAuthenticatedFn = createServerFn().handler(async () => {
  const { user } = await validateRequest();
  return !!user;
});

export const assertAuthenticatedFn = createServerFn().handler(async () => {
  const { user } = await validateRequest();
  if (!user) {
    throw redirect({ to: "/unauthenticated" });
  }

  return user;
});

const authorizedSchema = z.object({
  requiredPermission: z.enum(
    Object.values(Permissions) as [Permission, ...Permission[]],
  ),
});

export const assertHasPermissionFn = createServerFn()
  .middleware([authenticatedMiddleware])
  .inputValidator(zodValidator(authorizedSchema))
  .handler(async ({ data, context }) => {
    const hasPermission = context.permissions.includes(data.requiredPermission);
    if (!hasPermission) {
      throw redirect({ to: "/unauthorized" });
    }

    return true;
  });
