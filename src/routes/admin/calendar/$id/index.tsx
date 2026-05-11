import { BackTo } from "@/components/back-to";
import { PageDescription, PageHeader, PageTitle } from "@/components/page-header";
import { getCalendarListDetailsFn } from "@/lib/fn/calendar";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/calendar/$id/")({
  component: RouteComponent,
  loader: async ({ params }) => {
    const results = await getCalendarListDetailsFn({ data: { id: params.id } });
    return results;
  },
});

function RouteComponent() {
  const data = Route.useLoaderData();
  const params = Route.useParams();

  return (
    <div>
      <BackTo to="/admin/calendar" label="Calendar Admin" />
      <PageHeader>
        <PageTitle>
          Calendar <span className="text-(--color-destructive)">Details</span>
        </PageTitle>
        <PageDescription>View the details for a single calendar entry.</PageDescription>
      </PageHeader>
      <Link to="/admin/calendar/$id/edit" params={{ id: params.id }}>
        Edit
      </Link>
    </div>
  );
}
