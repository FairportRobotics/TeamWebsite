import { BackTo } from "@/components/site/BackTo";
import { PageDescription, PageHeader, PageTitle } from "@/components/site/PageHeader";
import { getEventListDetailsFn } from "@/server/functions/calendar/getEventDetails";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/admin/calendar/$id/")({
  component: RouteComponent,
  loader: async ({ params }) => {
    const results = await getEventListDetailsFn({ data: { id: params.id } });
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
          Calendar <span className="text-destructive">Details</span>
        </PageTitle>
        <PageDescription>View the details for a single calendar entry.</PageDescription>
      </PageHeader>
      <Link to="/admin/calendar/$id/edit" params={{ id: params.id }}>
        Edit
      </Link>
    </div>
  );
}
