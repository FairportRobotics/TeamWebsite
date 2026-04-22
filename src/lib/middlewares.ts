import { redirect } from "@tanstack/react-router";
import { createMiddleware } from "@tanstack/react-start";
import { validateRequest } from "./auth/utils";

//
export const logMiddleware = createMiddleware({
  type: "function",
}).server(async ({ next }) => {
  return next({
    context: { requestStart: new Date().toISOString() },
  });
});

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
