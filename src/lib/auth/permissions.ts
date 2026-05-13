import { z } from "zod";

// Define the permissions and their names.
export const Permissions = {
  EventAdminister: "event:administer",
  EventApprove: "event:approve",
  EventCreate: "event:create",
  EventDelete: "event:delete",
  EventReadPrivate: "event:read:private",
  EventUpdate: "event:update",

  GameYearAdminister: "game-year:administer",
  GameYearApprove: "game-year:approve",
  GameYearCreate: "game-year:create",
  GameYearDelete: "game-year:delete",
  GameYearUpdate: "game-year:update",
  GameYearRobotCreate: "game-year:robot:create",
  GameYearRobotDelete: "game-year:robot:delete",
  GameYearRobotUpdate: "game-year:robot:update",
  GameYearRobotApprove: "game-year:robot:approve",

  SponsorAdminister: "sponsor:administer",
  SponsorApprove: "sponsor:approve",
  SponsorCreate: "sponsor:create",
  SponsorDelete: "sponsor:delete",
  SponsorUpdate: "sponsor:update",

  UserAssociateParent: "user:associate:parent",
  UserAssociateStudent: "user:associate:student",
  UserBan: "user:ban",
  UserCreate: "user:create",
  UserEditAny: "user:edit:any",
  UserImpersonate: "user:impersonate",
  UserRevokeSessions: "user:revoke:sessions",
  UserUnban: "user:unban",
  UserViewAll: "user:view:all",

  // EventApprovePending: "event:approve:pending",
  // EventCreate: "event:create",
  // EventEditAny: "event:edit:any",
  // EventEditOwn: "event:edit:own",
  // EventViewAll: "event:view:all",
  // EventViewAllPending: "event:view:all:pending",
  // EventViewOwnPending: "event:view:own:pending",
  // EventViewPublished: "event:view:published",
  // EventViewPublished: "event:view:published",
} as const;

export const PermissionSchema = z.enum(Permissions);

// 🔑 Array validator (matches your `readonly Permission[]` type)
export const PermissionsArraySchema = z.array(PermissionSchema).min(1);

// 🔑 Extract the validated type for TypeScript
export type Permission = z.infer<typeof PermissionSchema>;
