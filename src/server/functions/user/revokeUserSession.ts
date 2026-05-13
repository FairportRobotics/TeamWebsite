// prettier-ignore
import { authClient } from "@/lib/auth/auth-client";
import { Permissions } from "@/lib/auth/permissions";
import { sessionTokenSchema } from "@/server/functions/user/_common";
import { anyPermissionMiddleware } from "@/server/middleware/anyPermission";
import { authenticatedMiddleware } from "@/server/middleware/authenticated";
import { useNavigate } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { zodValidator } from "@tanstack/zod-adapter";
import { toast } from "sonner";

export const revokeUserSessionFn = createServerFn()
  .middleware([authenticatedMiddleware, anyPermissionMiddleware([Permissions.UserRevokeSessions])])
  .inputValidator(zodValidator(sessionTokenSchema))
  .handler(async ({ data }) => {
    const sessionToken = data.sessionToken;

    const navigate = useNavigate();

    authClient.admin.revokeUserSession(
      { sessionToken },
      {
        onError: (error) => {
          toast.error(error.error.message || "Failed to revoke user session");
        },
        onSuccess: () => {
          navigate({ to: "/admin/users" });
        },
      },
    );
  });
