import { sessionMiddleware } from "@/server/middleware/session";
import { redirect } from "@tanstack/react-router";
import { createMiddleware } from "@tanstack/react-start";

export const authenticatedMiddleware = createMiddleware()
  .middleware([sessionMiddleware])
  .server(async ({ next, context }) => {
    if (!context?.user) {
      throw redirect({ to: "/unauthenticated" });
    }

    return next({
      context: {
        user: context?.user,
      },
    });
  });
