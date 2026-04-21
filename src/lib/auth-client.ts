import { adminClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import { ac, admin, moderator, parent, student } from "./auth/permissions";

export const authClient = createAuthClient({
  plugins: [adminClient({ ac, roles: { student, parent, moderator, admin } })],
});
