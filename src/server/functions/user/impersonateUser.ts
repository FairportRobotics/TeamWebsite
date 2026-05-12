// prettier-ignore
import { authClient } from "@/lib/auth/auth-client";
import { userIdSchema } from "@/server/functions/user/_common";
import { authenticatedMiddleware } from "@/server/middleware/authenticated";
import { useNavigate } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { zodValidator } from "@tanstack/zod-adapter";
import { toast } from "sonner";

// TODO: Lock down with Permission.
export const impersonateUserFn = createServerFn()
  .middleware([authenticatedMiddleware])
  .inputValidator(zodValidator(userIdSchema))
  .handler(async ({ data }) => {
    const userId = data.userId;

    const navigate = useNavigate();

    authClient.admin.impersonateUser(
      { userId },
      {
        onError: (error) => {
          toast.error(error.error.message || "Failed to impersonate user");
        },
        onSuccess: () => {
          navigate({ to: "/" });
        },
      },
    );
  });
