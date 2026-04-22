import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { auth } from "../auth";

export const validateRequest = createServerFn().handler(async () => {
  const headers = getRequestHeaders();
  const currentSession = await auth.api.getSession({ headers });
  return { user: currentSession?.user ?? undefined };
});
