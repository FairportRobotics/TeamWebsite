import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import type { authClient } from "./lib/auth/auth-client";
import { routeTree } from "./routeTree.gen";

export type SessionType = Awaited<ReturnType<typeof authClient.useSession>>;
export type ContextUser = NonNullable<SessionType["data"]>["user"];
export type ContextSession = NonNullable<SessionType["data"]>["session"];

export interface RouterContext {
  auth: {
    session: ContextSession | undefined;
    user: ContextUser | undefined;
  };
}

export function getRouter() {
  const router = createTanStackRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreload: "intent",
    defaultPreloadDelay: 300,
    defaultPreloadStaleTime: 0,
    context: {
      auth: {
        session: undefined!,
        user: undefined!,
      },
    },
  });

  return router;
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}

export type AppRouter = typeof getRouter;
