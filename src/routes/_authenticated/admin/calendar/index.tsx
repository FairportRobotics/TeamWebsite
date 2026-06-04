// prettier-ignore
import { EventDraftsTable } from "@/components/admin/calendar/EventDraftsTable";
import { EventPublishedTable } from "@/components/admin/calendar/EventPublishedTable";
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
  const {
    data: { drafts, published },
  } = useSuspenseQuery(calendarQueries.list());

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
          <EventDraftsTable data={drafts} />
        </PageSectionContainer>

        <PageSectionContainer
          title="Published Events"
          subTitle={`(${published.length} records)`}
          initialState="collapsed"
        >
          <EventPublishedTable data={published} />
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
