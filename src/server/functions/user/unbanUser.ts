// prettier-ignore
import { authClient } from "@/lib/auth/auth-client";
import { userIdSchema } from "@/server/functions/user/_common";
import { authenticatedMiddleware } from "@/server/middleware/authenticated";
import { useRouter } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { zodValidator } from "@tanstack/zod-adapter";
import { toast } from "sonner";

// TODO: Lock down with Permission.
export const unbanUserFn = createServerFn()
  .middleware([authenticatedMiddleware])
  .inputValidator(zodValidator(userIdSchema))
  .handler(async ({ data }) => {
    const userId = data.userId;
    const router = useRouter();

    authClient.admin.unbanUser(
      { userId },
      {
        onError: (error) => {
          toast.error(error.error.message || "Failed to unban user");
        },
        onSuccess: () => {
          toast.success("User was unbanned");
          router.invalidate();
        },
      },
    );
  });
