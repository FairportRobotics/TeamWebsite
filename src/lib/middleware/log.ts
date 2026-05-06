import { createMiddleware } from "@tanstack/react-start";

/**
 * Adds logging ability.
 * @returns {next} Adds user to the context for downstream consumers.
 */
export const logMiddleware = createMiddleware({
  type: "function",
}).server(async ({ next }) => {
  return next({
    context: {
      requestStartDt: new Date().toISOString(),
      requestId: crypto.randomUUID(),
    },
  });
});
