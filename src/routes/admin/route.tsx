import { Permissions } from "@/lib/auth/permissions";
import { assertHasAnyPermissionFn } from "@/lib/auth/server";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/admin")({
  beforeLoad: async ({ context }) => {
    await assertHasAnyPermissionFn({
      data: {
        requiredPermission: [
          Permissions.UserAdminister,
          Permissions.EventAdminister,
          Permissions.SponsorAdminister,
          Permissions.GameYearAdminister,
        ],
      },
    });
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <Outlet />
    </div>
  );
}
