import { createMiddleware } from "@tanstack/react-start";
import { logger } from "../logger";

const generateRequestId = () => `req_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;

export const loggingMiddleware = createMiddleware().server(async ({ next, request, pathname }) => {
  const startTime = performance.now();
  const requestId = generateRequestId();

  try {
    const result = await next();
    const duration = performance.now() - startTime;

    logger.info(`[${pathname}] completed`, {
      requestId,
      duration: `${duration.toFixed(2)}ms`,
      status: result?.response?.status ?? "success",
      userAgent: request.headers?.get?.("user-agent")?.slice(0, 50),
    });

    return result;
  } catch (err) {
    const duration = performance.now() - startTime;
    logger.error(`[${pathname}] failed`, {
      requestId,
      duration: `${duration.toFixed(2)}ms`,
      error: err instanceof Error ? err.message : "Unknown",
      stack: err instanceof Error ? err.stack : undefined,
    });
    throw err;
  }
});
