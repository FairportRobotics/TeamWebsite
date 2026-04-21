import {
  PageDescription,
  PageHeader,
  PageTitle,
} from "@/components/page-header";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/sponsors")({
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
