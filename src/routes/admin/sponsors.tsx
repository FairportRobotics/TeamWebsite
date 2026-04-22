import {
  PageDescription,
  PageHeader,
  PageTitle,
} from "@/components/page-header";
import { Permissions } from "@/lib/auth/permissions";
import { assertHasPermissionFn } from "@/lib/auth/server";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/sponsors")({
  beforeLoad: async () => {
    await assertHasPermissionFn({
      data: {
        requiredPermission: Permissions.SponsorAdminister,
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
          Sponsor{" "}
          <span className="text-(--color-destructive)">Administration</span>
        </PageTitle>
        <PageDescription>Manage sponsors.</PageDescription>
      </PageHeader>
    </div>
  );
}
