import { postgres } from "vite-plugin-neon-new";

// TODO: Fix seed path.
export default postgres({
  seed: {
    type: "sql-script",
    path: "db/init.sql",
  },
  referrer: "create-tanstack",
  dotEnvKey: "DATABASE_URL",
});
