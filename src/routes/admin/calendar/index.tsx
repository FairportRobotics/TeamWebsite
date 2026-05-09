// prettier-ignore
import { CalendarEventTable } from "@/components/admin/calendar/calendar-event-table";
import { BackTo } from "@/components/back-to";
import { PageDescription, PageHeader, PageTitle } from "@/components/page-header";
import { PageSectionContainer } from "@/components/page-section-container";
import { TeamActionButton } from "@/components/team-action-buttom";
import { Permissions } from "@/lib/auth/permissions";
import { assertHasAnyPermissionFn } from "@/lib/auth/server";
import {
  approveCalendarFn,
  archiveCalendarFn,
  getCalendarListForAdminFn,
  requestApprovalCalendarFn,
  seedCalendarFn,
} from "@/lib/fn/calendar";
import { createFileRoute, useRouter } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/calendar/")({
  beforeLoad: async () => {
    await assertHasAnyPermissionFn({
      data: { permissions: [Permissions.EventAdminister, Permissions.EventCreate] },
    });
  },
  loader: async () => {
    const calendar = await getCalendarListForAdminFn();
    return calendar;
  },
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();

  // Get the entire list of calendar entries and filter according to type.
  const calendar = Route.useLoaderData();
  const pendingApproval = calendar.filter((c) => c.status === "pending_review");
  const drafts = calendar.filter((c) => c.status === "draft");
  const published = calendar.filter((c) => c.status === "published");
  const archived = calendar.filter((c) => c.status === "archived");

  async function handleSeedCalendar() {
    await seedCalendarFn();
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
    await approveCalendarFn({ data: { id } });
    router.invalidate();
    return { error: null };
  }

  const handleArchive = async (id: string) => {
    console.log("handleArchive", id);
    await archiveCalendarFn({ data: { id } });
    router.invalidate();
    return { error: null };
  };

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
          <CalendarEventTable
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
          title="Published"
          subTitle={`(${published.length} records)`}
          initialState="collapsed"
        >
          <CalendarEventTable data={published} actionLabel="Archive" onAction={handleArchive} />
        </PageSectionContainer>

        <PageSectionContainer
          title="Archived"
          subTitle={`(${archived.length} records)`}
          initialState="collapsed"
        >
          <CalendarEventTable data={archived} actionLabel="Edit" onAction={handleEdit} />
        </PageSectionContainer>
      </div>

      <TeamActionButton
        variant="destructive"
        className="mt-10"
        action={() => {
          return handleSeedCalendar();
        }}
      >
        Seed Calendar
      </TeamActionButton>
    </div>
  );
}
