// prettier-ignore
import { Permissions } from "@/lib/auth/permissions";
import { assertHasAnyPermissionFn } from "@/lib/auth/server";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/admin")({
  beforeLoad: async () => {
    await assertHasAnyPermissionFn({
      data: {
        permissions: [
          Permissions.EventAdminister,
          Permissions.GameYearAdminister,
          Permissions.SponsorAdminister,
          Permissions.UserAdminister,
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
