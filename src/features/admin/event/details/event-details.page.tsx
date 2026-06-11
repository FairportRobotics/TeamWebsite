import { BackTo } from "@/components/site/BackTo";
import { PageDescription, PageHeader, PageTitle } from "@/components/site/PageHeader";
import { useLoaderData } from "@tanstack/react-router";

export function EventDetailsPage() {
  const { published, draft, history } = useLoaderData({ from: "/_authenticated/admin/calendar/$id/" });

  return (
    <div>
      <BackTo to="/admin/calendar" label="Calendar Admin" />
      <PageHeader>
        <PageTitle>
          Event <span className="text-destructive">Details</span>
        </PageTitle>
        <PageDescription>View the details for a single calendar entry.</PageDescription>
      </PageHeader>

      <h2>Current</h2>
      <pre>{JSON.stringify(published, null, 2)}</pre>
      <pre>{JSON.stringify(draft, null, 2)}</pre>

      <h2>History</h2>
      <pre>{JSON.stringify(history, null, 2)}</pre>
    </div>
  );
}
