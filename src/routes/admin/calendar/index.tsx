// prettier-ignore
import { BackTo } from "@/components/back-to";
import { PageDescription, PageHeader, PageTitle } from "@/components/page-header";
import { SectionHeader } from "@/components/section-header";
import { TeamActionButton } from "@/components/team-action-buttom";
import { Permissions } from "@/lib/auth/permissions";
import { assertHasAnyPermissionFn } from "@/lib/auth/server";
import { seedCalendarFn } from "@/lib/fn/calendar";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/calendar/")({
  beforeLoad: async () => {
    await assertHasAnyPermissionFn({
      data: { permissions: [Permissions.EventAdminister, Permissions.EventCreate] },
    });
  },
  loader: async () => {
    // const calendar = await getEventsForAdminFn();
    // return calendar;
  },
  component: RouteComponent,
});

function RouteComponent() {
  const calendar = Route.useLoaderData();

  async function handleSeedCalendar() {
    await seedCalendarFn();
    return { error: null };
  }

  return (
    <div>
      <BackTo to="/admin" label="Admin" />
      <PageHeader>
        <PageTitle>
          Event <span className="text-(--color-destructive)">Administration</span>
        </PageTitle>
        <PageDescription>Manage events and the calendar.</PageDescription>
      </PageHeader>

      <SectionHeader>Published Events</SectionHeader>

      <SectionHeader>Ubpublished Events</SectionHeader>
      <section>
        <pre>{JSON.stringify(calendar, null, 2)}</pre>
      </section>

      <TeamActionButton
        variant="destructive"
        className="mt-4"
        action={() => {
          return handleSeedCalendar();
        }}
      >
        Seed Calendar
      </TeamActionButton>
    </div>
  );
}
