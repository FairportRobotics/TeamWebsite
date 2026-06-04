// prettier-ignore
import { EventDraftsTable } from "@/components/admin/calendar/EventDraftsTable";
import { EventPublishedTable } from "@/components/admin/calendar/EventPublishedTable";
import { BackTo } from "@/components/site/BackTo";
import { PageDescription, PageHeader, PageTitle } from "@/components/site/PageHeader";
import { TeamActionButton } from "@/components/site/TeamActionButtom";
import { Button } from "@/components/ui/button";
import { calendarQueries } from "@/queries/calendarQueries";
import { seedEventsFn } from "@/server/functions/calendar/seed";
import { createFileRoute, Link, useRouter } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/admin/calendar/")({
  component: RouteComponent,
  loader: ({ context }) => {
    context.queryClient?.ensureQueryData(calendarQueries.published());
  },
});

function RouteComponent() {
  const router = useRouter();

  async function handleSeedCalendar() {
    await seedEventsFn();
    router.invalidate();
    return { error: null };
  }

  return (
    <div>
      <BackTo to="/admin" label="Back to Admin" />
      <PageHeader>
        <PageTitle>
          Calendar <span className="text-(--color-destructive)">Administration</span>
        </PageTitle>
        <PageDescription>Manage events that appear on the Calendar.</PageDescription>
      </PageHeader>

      <div className="flex flex-col gap-10">
        <EventDraftsTable />
        <EventPublishedTable />
      </div>

      <Button asChild variant="default">
        <Link to="/admin/calendar/new">Create New Event</Link>
      </Button>

      <TeamActionButton
        variant="destructive"
        className="mt-10 ml-6"
        action={() => {
          return handleSeedCalendar();
        }}
      >
        Seed Calendar
      </TeamActionButton>
    </div>
  );
}
