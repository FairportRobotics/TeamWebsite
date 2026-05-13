const isDev = process.env.NODE_ENV === "development";
const logLevel = process.env.LOG_LEVEL ?? (isDev ? "debug" : "info");

export const logger = {
  debug: (msg: string, meta?: Record<string, unknown>) => {
    if (logLevel === "debug") console.debug(`[DEBUG] ${msg}`, meta);
  },
  info: (msg: string, meta?: Record<string, unknown>) => {
    if (["info", "debug"].includes(logLevel)) console.info(`[INFO] ${msg}`, meta);
  },
  error: (msg: string, meta?: Record<string, unknown>) => {
    console.error(`[ERROR] ${msg}`, meta);
  },
};
