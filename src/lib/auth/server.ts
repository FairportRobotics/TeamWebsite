import { redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { auth } from "../auth";
import { authenticatedMiddleware } from "../middlewares";
import { validateRequest } from "./utils";

export const getSessionFn = createServerFn({ method: "GET" }).handler(
  async () => {
    const headers = getRequestHeaders();
    const currentSession = await auth.api.getSession({ headers });
    return currentSession ?? undefined;
  },
);

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
  .handler(async () => {
    return true;
  });

export const assertHasPermissionFn = createServerFn()
  .middleware([authenticatedMiddleware])
  .handler(async () => {
    return true;
  });

export const hasAnyPermissionFn = createServerFn()
  .middleware([authenticatedMiddleware])
  .handler(async () => {
    return true;
  });

export const assertHasAnyPermissionFn = createServerFn()
  .middleware([authenticatedMiddleware])
  .handler(async () => {
    return true;
  });
