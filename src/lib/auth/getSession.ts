import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { auth } from ".";

export const getSessionFn = createServerFn().handler(async () => {
  const request = getRequest();

  const sessionData = await auth.api.getSession({
    headers: request.headers,
  });

  return {
    session: sessionData?.session,
    user: sessionData?.user,
  };
});
