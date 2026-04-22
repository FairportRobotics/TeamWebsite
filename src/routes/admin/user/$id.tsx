import { Permissions } from "@/lib/auth/permissions";
import { getSessionFn, hasPermissionFn } from "@/lib/auth/server";
import { getUserListFn } from "@/lib/fn/user";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/user/$id")({
  component: RouteComponent,
  loader: async () => {
    const [
      session,
      users,
      canBan,
      canImpersonate,
      canRevokeSessions,
      canDelete,
    ] = await Promise.all([
      getSessionFn(),
      getUserListFn(),
      hasPermissionFn({
        data: { requiredPermission: Permissions.UserBan },
      }),
      hasPermissionFn({
        data: { requiredPermission: Permissions.UserImpersonate },
      }),
      hasPermissionFn({
        data: { requiredPermission: Permissions.UserRevokeSessions },
      }),
      hasPermissionFn({
        data: { requiredPermission: Permissions.UserDelete },
      }),
    ]);

    return {
      users,
      selfId: session?.user.id,
      canBan,
      canImpersonate,
      canRevokeSessions,
      canDelete,
    };
  },
});

function RouteComponent() {
  return <div>Hello "/admin/user/$id"!</div>;
}
