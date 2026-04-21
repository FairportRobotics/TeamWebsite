import {
  PageDescription,
  PageHeader,
  PageTitle,
} from "@/components/page-header";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/game-years")({
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
