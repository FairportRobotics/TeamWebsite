import { createMiddleware } from "@tanstack/react-start";
import { getSession } from "../auth/utils/session";

/**
 * Adds logging ability.
 * @returns {next} Adds user to the context for downstream consumers.
 */
export const authenticatedMiddleware = createMiddleware({
  type: "function",
}).server(async ({ next }) => {
  const session = await getSession();

  return next({
    context: {
      user: session?.user,
    },
  });
});
