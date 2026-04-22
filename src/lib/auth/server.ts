import { redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { zodValidator } from "@tanstack/zod-adapter";
import { z } from "zod";
import { auth } from "../auth";
import { authenticatedMiddleware } from "../middlewares";
import { Permissions } from "./permissions";
import { validateRequest } from "./utils";

export const PermissionSchema = z.enum(Permissions);

const hasPermissionSchema = z.object({
  requiredPermission: PermissionSchema,
});

const hasAnyPermissionSchema = z.object({
  requiredPermission: z.array(PermissionSchema),
});

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
  .inputValidator(zodValidator(hasPermissionSchema))
  .handler(async ({ data, context }) => {
    return context.permissions.includes(data.requiredPermission);
  });

export const assertHasPermissionFn = createServerFn()
  .middleware([authenticatedMiddleware])
  .inputValidator(zodValidator(hasPermissionSchema))
  .handler(async ({ data, context }) => {
    const hasPermission = context.permissions.includes(data.requiredPermission);
    if (!hasPermission) {
      throw redirect({ to: "/unauthorized" });
    }

    return true;
  });

export const hasAnyPermissionFn = createServerFn()
  .middleware([authenticatedMiddleware])
  .inputValidator(zodValidator(hasAnyPermissionSchema))
  .handler(async ({ data, context }) => {
    return context.permissions.some((p) => data.requiredPermission.includes(p));
  });

export const assertHasAnyPermissionFn = createServerFn()
  .middleware([authenticatedMiddleware])
  .inputValidator(zodValidator(hasAnyPermissionSchema))
  .handler(async ({ data, context }) => {
    const hasPermission = context.permissions.some((p) =>
      data.requiredPermission.includes(p),
    );
    if (!hasPermission) {
      throw redirect({ to: "/unauthorized" });
    }

    return true;
  });
