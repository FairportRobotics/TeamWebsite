import { BackTo } from "@/components/back-to";
import { PageDescription, PageHeader, PageTitle } from "@/components/page-header";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/calendar/$id/")({
  component: RouteComponent,
  loader: async ({ context }) => {},
});

function RouteComponent() {
  return (
    <div>
      <BackTo to="/admin/calendar" label="Calendar Items" />
      <PageHeader>
        <PageTitle>
          Calendar <span className="text-(--color-destructive)">Details</span>
        </PageTitle>
        <PageDescription>View the details for a single calendar entry.</PageDescription>
      </PageHeader>
    </div>
  );
}
