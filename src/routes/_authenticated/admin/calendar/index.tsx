// prettier-ignore
import { CalendarEventTable } from "@/components/admin/calendar/CalendarEventTable";
import { DraftsTable } from "@/components/admin/calendar/DraftsTable";
import { BackTo } from "@/components/site/BackTo";
import { PageDescription, PageHeader, PageTitle } from "@/components/site/PageHeader";
import { PageSectionContainer } from "@/components/site/PageSectionContainer";
import { TeamActionButton } from "@/components/site/TeamActionButtom";
import { Button } from "@/components/ui/button";
import { calendarsQuery } from "@/queries/calendarsQuery";
import { approveRequest } from "@/server/functions/calendar/approveRequest";
import { requestApprovalCalendarFn } from "@/server/functions/calendar/requestApproval";
import { seedEventsFn } from "@/server/functions/calendar/seed";
import { createFileRoute, Link, useRouter } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/admin/calendar/")({
  loader: async ({ context }) => context.queryClient?.ensureQueryData(calendarsQuery),
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();

  // Get the entire list of calendar entries and filter according to type.
  const calendar = Route.useLoaderData();

  const pendingApproval = calendar?.filter((c) => c.status === "pending_review") ?? [];
  const drafts = calendar?.filter((c) => c.status === "draft") ?? [];
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

  async function handleRequestApproval(id: string) {
    console.log("handleRequestApproval", id);
    await requestApprovalCalendarFn({ data: { id } });
    router.invalidate();
    return { error: null };
  }

  async function handleApprove(id: string) {
    console.log("handleApprove", id);
    await approveRequest({ data: { id } });
    router.invalidate();
    return { error: null };
  }

  const handleEdit = async (id: string) => {
    console.log("handleEdit", id);
    //await archiveCalendarFn({ data: { id } });
    router.invalidate();
    return { error: null };
  };

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
          title="Drafts"
          subTitle={`(${drafts.length} records)`}
          initialState="collapsed"
        >
          <DraftsTable
            data={drafts}
            actionLabel="Request Approval"
            onAction={handleRequestApproval}
          />
        </PageSectionContainer>

        <PageSectionContainer
          title="Pending Approval"
          subTitle={`(${pendingApproval.length} records)`}
          initialState="collapsed"
        >
          <CalendarEventTable
            data={pendingApproval}
            actionLabel="Approve"
            onAction={handleApprove}
          />
        </PageSectionContainer>

        <PageSectionContainer
          title="Upcoming"
          subTitle={`(${upcoming.length} records)`}
          initialState="collapsed"
        >
          <CalendarEventTable data={upcoming} actionLabel="Archive" onAction={handleApprove} />
        </PageSectionContainer>

        <PageSectionContainer
          title="Archived"
          subTitle={`(${archived.length} records)`}
          initialState="collapsed"
        >
          <CalendarEventTable data={archived} actionLabel="Edit" onAction={handleEdit} />
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
