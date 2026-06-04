// prettier-ignore
import { auth } from "@/lib/auth";
import { Permissions } from "@/lib/auth/permissions";
import { userIdSchema } from "@/server/functions/user/_common";
import { anyPermissionMiddleware } from "@/server/middleware/anyPermission";
import { authenticatedMiddleware } from "@/server/middleware/authenticated";
import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { zodValidator } from "@tanstack/zod-adapter";

export const revokeAllUserSessionsFn = createServerFn()
  .middleware([authenticatedMiddleware, anyPermissionMiddleware([Permissions.UserRevokeSessions])])
  .inputValidator(zodValidator(userIdSchema))
  .handler(async ({ data }) => {
    const request = getRequest();
    const userId = data.userId;

    await auth.api.revokeUserSessions({
      headers: request.headers,
      body: { userId },
    });
  });
