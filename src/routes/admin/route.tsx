// prettier-ignore
import { Permissions } from "@/lib/auth/permissions";
import { assertHasAnyPermission } from "@/lib/auth/utils/permissions";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/admin")({
  beforeLoad: async ({ context }) => {
    assertHasAnyPermission(context.data?.user.role, [
      Permissions.UserAdminister,
      Permissions.EventAdminister,
      Permissions.SponsorAdminister,
      Permissions.GameYearAdminister,
    ]);
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
