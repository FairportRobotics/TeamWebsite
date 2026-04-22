import { BackTo } from "@/components/back-to";
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
        requiredPermission: Permissions.EventAdminister,
      },
    });
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <BackTo to="/admin" label="Admin" />
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
