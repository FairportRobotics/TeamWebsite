// prettier-ignore
import { CalendarEventsTable } from "@/components/admin/calendar/CalendarEventsTable";
import { BackTo } from "@/components/site/BackTo";
import { PageDescription, PageHeader, PageTitle } from "@/components/site/PageHeader";
import { PageSectionContainer } from "@/components/site/PageSectionContainer";
import { TeamActionButton } from "@/components/site/TeamActionButtom";
import { Button } from "@/components/ui/button";
import { getCalendarListForAdminFn } from "@/server/functions/calendar/getCalendarListForAdmin";
import { seedEventsFn } from "@/server/functions/calendar/seed";
import { createFileRoute, Link, useRouter } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/admin/calendar/")({
  component: RouteComponent,
  loader: () => {
    const events = getCalendarListForAdminFn();
    return events;
  },
});

function RouteComponent() {
  const router = useRouter();
  const events = Route.useLoaderData();

  const drafts = events?.filter((c) => c.status === "draft") ?? [];
  const pending = events?.filter((c) => c.status === "pending") ?? [];
  const upcoming =
    events?.filter(
      (c) => c.status === "published" && c.dates.some((d) => new Date(d.endAt) >= new Date()),
    ) ?? [];
  const archived =
    events?.filter(
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
          <CalendarEventsTable data={drafts} />
        </PageSectionContainer>

        <PageSectionContainer
          title="Events Awaiting Approval"
          subTitle={`(${pending.length} records)`}
          initialState="collapsed"
        >
          <CalendarEventsTable data={pending} />
        </PageSectionContainer>

        <PageSectionContainer
          title="Upcoming Events"
          subTitle={`(${upcoming.length} records)`}
          initialState="collapsed"
        >
          <CalendarEventsTable data={upcoming} />
        </PageSectionContainer>

        <PageSectionContainer
          title="Past Events"
          subTitle={`(${archived.length} records)`}
          initialState="collapsed"
        >
          <CalendarEventsTable data={archived} />
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
