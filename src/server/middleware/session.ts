import { auth } from "@/lib/auth";
import { createMiddleware } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";

export const sessionMiddleware = createMiddleware().server(async ({ next }) => {
  const headers = getRequestHeaders();
  const currentSession = await auth.api.getSession({ headers });

  if (!currentSession) {
    return next();
  }

  return next({
    context: {
      user: currentSession.user,
    },
  });
});
