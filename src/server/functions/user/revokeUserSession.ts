import { auth } from "@/lib/auth";
import { Permissions } from "@/lib/auth/permissions";
import { sessionTokenSchema } from "@/server/functions/user/_common";
import { anyPermissionMiddleware } from "@/server/middleware/anyPermission";
import { authenticatedMiddleware } from "@/server/middleware/authenticated";
import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { zodValidator } from "@tanstack/zod-adapter";

export const revokeUserSessionFn = createServerFn()
  .middleware([authenticatedMiddleware, anyPermissionMiddleware([Permissions.UserRevokeSessions])])
  .validator(zodValidator(sessionTokenSchema))
  .handler(async ({ data }) => {
    const request = getRequest();
    const sessionToken = data.sessionToken;

    await auth.api.revokeUserSession({
      headers: request.headers,
      body: { sessionToken },
    });
  });
