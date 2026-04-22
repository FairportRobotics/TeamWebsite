import { adminClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import {
  accessControl,
  admin,
  eventModerator,
  gameModerator,
  mentor,
  parent,
  robotModerator,
  sponsorModerator,
  student,
  userModerator,
} from "./auth/permissions";

export const authClient = createAuthClient({
  plugins: [
    adminClient({
      accessControl,
      roles: {
        admin,
        mentor,
        student,
        parent,
        eventModerator,
        gameModerator,
        robotModerator,
        sponsorModerator,
        userModerator,
      },
    }),
  ],
});
