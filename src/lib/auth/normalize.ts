import type { Role } from "@/lib/auth/permissions";
import { Roles } from "@/lib/auth/permissions";

// auth/normalize.ts
const ALL_ROLES = Object.values(Roles);

function isRole(value: string): value is Role {
  return ALL_ROLES.includes(value as Role);
}

export function normalizeRoles(input: unknown): Role[] {
  if (Array.isArray(input)) {
    return input.filter(isRole);
  }

  if (typeof input === "string") {
    return input
      .split(",")
      .map((r) => r.trim())
      .filter(isRole);
  }

  return [];
}
