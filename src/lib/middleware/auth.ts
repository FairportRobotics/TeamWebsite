import { validateRequest } from "@/lib/auth/utils/request";
import { logMiddleware } from "@/lib/middleware/log";
import { redirect } from "@tanstack/react-router";
import { createMiddleware } from "@tanstack/react-start";

// Handles checking whether the request is part of an authenticated pipeline and adds context for
// downstream consumers.
export const authenticatedMiddleware = createMiddleware({
  type: "function",
})
  .middleware([logMiddleware])
  .server(async ({ next }) => {
    // Obtain the user.
    const { user } = await validateRequest();

    // Verify the user exists.
    if (!user) {
      throw redirect({ to: "/unauthenticated" });
    }

    // Add desired properties to the context.
    return next({ context: { user: user } });
  });
