import {
  PageDescription,
  PageHeader,
  PageTitle,
} from "@/components/page-header";
import { Permissions } from "@/lib/auth/permissions";
import { assertHasPermissionFn } from "@/lib/auth/server";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/events")({
  beforeLoad: async () => {
    await assertHasPermissionFn({
      data: {
        requiredPermission: Permissions.GameYearAdminister,
      },
    });
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <PageHeader>
        <PageTitle>
          Event{" "}
          <span className="text-(--color-destructive)">Administration</span>
        </PageTitle>
        <PageDescription>Manage events and the calendar.</PageDescription>
      </PageHeader>
    </div>
  );
}
