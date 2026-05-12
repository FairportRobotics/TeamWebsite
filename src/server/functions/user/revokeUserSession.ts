// prettier-ignore
import { authClient } from "@/lib/auth/auth-client";
import { sessionTokenSchema } from "@/server/functions/user/_common";
import { authenticatedMiddleware } from "@/server/middleware/authenticated";
import { useNavigate } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { zodValidator } from "@tanstack/zod-adapter";
import { toast } from "sonner";

// TODO: Lock down with Permission.
export const revokeUserSessionFn = createServerFn()
  .middleware([authenticatedMiddleware])
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
