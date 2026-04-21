import { adminClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import {
  ac,
  admin,
  eventModerator,
  gameYearModerator,
  mentor,
  parent,
  sponsorModerator,
  student,
} from "./auth/permissions";

export const authClient = createAuthClient({
  plugins: [
    adminClient({
      ac,
      roles: {
        admin,
        eventModerator,
        gameYearModerator,
        mentor,
        parent,
        sponsorModerator,
        student,
      },
    }),
  ],
});
