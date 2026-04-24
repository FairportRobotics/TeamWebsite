import { createMiddleware } from "@tanstack/react-start";

export const logMiddleware = createMiddleware({
  type: "function",
}).server(async ({ next }) => {
  return next({
    context: { requestStart: new Date().toISOString() },
  });
});
