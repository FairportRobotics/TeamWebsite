import { db } from "@/db";
import { user } from "@/db/schema";
import { seedUsers } from "@/db/seed/users";
import { Permissions } from "@/lib/auth/permissions";
import { anyPermissionMiddleware } from "@/server/middleware/anyPermission";
import { sessionMiddleware } from "@/server/middleware/session";
import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";

// TODO: Remove when live.
export const seedUsersFn = createServerFn()
  .middleware([sessionMiddleware, anyPermissionMiddleware([Permissions.UserCreate])])
  .handler(async () => {
    seedUsers.forEach(async (data) => {
      console.log("🌱 Seeding User", data.name);

      // const response = await auth.api.createUser({
      //   body: {
      //     name: data.name,
      //     email: data.email,
      //     password: "Password123!",
      //     role: "user",
      //   },
      // });

      // console.log(response);

      // const userId = response.user.id;
      // console.log("🌱 Seeding User userId", userId);

      // if (!userId) return;

      await db
        .update(user)
        .set({
          role: data.role,
        })
        .where(eq(user.email, data.email));
    });
  });
