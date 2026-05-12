// prettier-ignore
import { authClient } from "@/lib/auth/auth-client";
import { authenticatedMiddleware } from "@/server/middleware/authenticated";
import { useRouter } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { zodValidator } from "@tanstack/zod-adapter";
import { toast } from "sonner";
import { z } from "zod";

// Ban User
const banUserSchema = z.object({
  userId: z.string(),
  reason: z.string(),
  expires: z.date().nullable(),
});

// TODO: Lock down with Permission.
export const banUserFn = createServerFn()
  .middleware([authenticatedMiddleware])
  .inputValidator(zodValidator(banUserSchema))
  .handler(async ({ data }) => {
    const userId = data.userId;
    const router = useRouter();

    authClient.admin.banUser(
      { userId: userId, banReason: data.reason },
      {
        onError: (error) => {
          toast.error(error.error.message || "Failed to ban user");
        },
        onSuccess: () => {
          toast.success("User was banned");
          router.invalidate();
        },
      },
    );
  });
