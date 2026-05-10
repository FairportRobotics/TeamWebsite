import { BackTo } from "@/components/back-to";
import { PageDescription, PageHeader, PageTitle } from "@/components/page-header";
import { getCalendarListDetailsFn } from "@/lib/fn/calendar";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/calendar/$id/")({
  component: RouteComponent,
  loader: async ({ params }) => {
    const results = await getCalendarListDetailsFn({ data: { id: params.id } });
    return results;
  },
});

function RouteComponent() {
  const data = Route.useLoaderData();
  return (
    <div>
      <BackTo to="/calendar" label="Calendar" />
      <PageHeader>
        <PageTitle>
          Calendar <span className="text-(--color-destructive)">Details</span>
        </PageTitle>
        <PageDescription>View the details for a single calendar entry.</PageDescription>
      </PageHeader>
      <div>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </div>
  );
}
