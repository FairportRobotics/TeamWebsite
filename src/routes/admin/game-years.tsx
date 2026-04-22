import {
  PageDescription,
  PageHeader,
  PageTitle,
} from "@/components/page-header";
import { Permissions } from "@/lib/auth/permissions";
import { assertHasPermissionFn } from "@/lib/auth/server";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/game-years")({
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
          Game Year{" "}
          <span className="text-(--color-destructive)">Administration</span>
        </PageTitle>
        <PageDescription>
          Manage game years, robots and sparketing efforts.
        </PageDescription>
      </PageHeader>
    </div>
  );
}
