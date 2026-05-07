import { createIsomorphicFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { createContext, useContext } from "react";
import { auth } from "..";
import { authClient } from "../auth-client";

export type AppSession = {
  user: { id: string; name: string; email: string; role: string; permissions: string[] };
} | null;

export const getSession = createIsomorphicFn()
  .server(async () => {
    const headers = getRequestHeaders();
    const session = await auth.api.getSession({ headers });

    if (!session?.user) {
      return null;
    }

    return {
      user: {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        role: session.user.role ?? "",
        permissions: [],
      },
    };
  })

  .client(async () => {
    const data = await authClient.getSession();

    if (!data.data?.user) {
      return null;
    }

    return {
      user: {
        id: data.data.user.id,
        name: data.data.user.name,
        email: data.data.user.email,
        role: data.data.user.role ?? "",
        permissions: [],
      },
    };
  });

export const SessionContext = createContext<AppSession>(null);

export function useSession() {
  const session = useContext(SessionContext);
  return session;
}
