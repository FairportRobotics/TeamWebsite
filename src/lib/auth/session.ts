import type { Permission, Role } from "@/lib/auth/permissions";

export type AppSession = {
  user: {
    id: string;
    name: string;
    roles: Role[];
    permissions: Permission[];
  };
};
