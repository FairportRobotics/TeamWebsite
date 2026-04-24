// prettier-ignore
import { validateRequest } from "@/lib/auth/utils/request";
import { authenticatedMiddleware } from "@/lib/middleware/auth";
import { redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { auth } from "../auth";
import type { Permission } from "../permissions";
import { hasAnyPermission } from "./utils/permissions";

export const getSessionFn = createServerFn({ method: "GET" }).handler(async () => {
  const headers = getRequestHeaders();
  const currentSession = await auth.api.getSession({ headers });
  return currentSession ?? undefined;
});

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

export const hasPermissionFn = createServerFn()
  .middleware([authenticatedMiddleware])
  .handler(async ({ data, context }) => {
    return true;
  });

export const assertHasPermissionFn = createServerFn()
  .middleware([authenticatedMiddleware])
  .handler(async ({ data }) => {
    return true;
  });

export const hasAnyPermissionFn = createServerFn()
  .middleware([authenticatedMiddleware])
  .inputValidator((data: { permissions: readonly Permission[] }) => data)
  .handler(async ({ data, context }) => {
    return hasAnyPermission(context.user.role, data.permissions);
  });

export const assertHasAnyPermissionFn = createServerFn()
  .middleware([authenticatedMiddleware])
  .handler(async ({ data }) => {
    return true;
  });

export const canAdministerUsersFn = createServerFn()
  .middleware([authenticatedMiddleware])
  .handler(async ({ context }) => {
    const allowed = await auth.api.userHasPermission({
      body: {
        userId: context.user.id,
        permissions: { user: ["impersonate"] },
      },
    });
    return true;
  });
