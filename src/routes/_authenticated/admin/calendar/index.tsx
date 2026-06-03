// prettier-ignore
import { EventsTable } from "@/components/admin/calendar/EventsTable";
import { BackTo } from "@/components/site/BackTo";
import { PageDescription, PageHeader, PageTitle } from "@/components/site/PageHeader";
import { PageSectionContainer } from "@/components/site/PageSectionContainer";
import { TeamActionButton } from "@/components/site/TeamActionButtom";
import { Button } from "@/components/ui/button";
import { calendarQueries } from "@/queries/calendarQueries";
import { seedEventsFn } from "@/server/functions/calendar/seed";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link, useRouter } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/admin/calendar/")({
  component: RouteComponent,
  loader: ({ context }) => context.queryClient?.ensureQueryData(calendarQueries.list()),
});

function RouteComponent() {
  const router = useRouter();
  const { data: calendar } = useSuspenseQuery(calendarQueries.list());

  const drafts = calendar?.filter((c) => c.status === "draft") ?? [];
  const pending = calendar?.filter((c) => c.status === "pending") ?? [];
  const upcoming =
    calendar?.filter(
      (c) => c.status === "published" && c.dates.some((d) => new Date(d.endAt) >= new Date()),
    ) ?? [];
  const archived =
    calendar?.filter(
      (c) => c.status === "published" && !c.dates.every((d) => new Date(d.endAt) >= new Date()),
    ) ?? [];

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
        <PageSectionContainer
          title="Event Drafts"
          subTitle={`(${drafts.length} records)`}
          initialState="expanded"
        >
          <EventsTable data={drafts} />
        </PageSectionContainer>

        <PageSectionContainer
          title="Events Awaiting Approval"
          subTitle={`(${pending.length} records)`}
          initialState="collapsed"
        >
          <EventsTable data={pending} />
        </PageSectionContainer>

        <PageSectionContainer
          title="Upcoming Events"
          subTitle={`(${upcoming.length} records)`}
          initialState="collapsed"
        >
          <EventsTable data={upcoming} />
        </PageSectionContainer>

        <PageSectionContainer
          title="Past Events"
          subTitle={`(${archived.length} records)`}
          initialState="collapsed"
        >
          <EventsTable data={archived} />
        </PageSectionContainer>
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
