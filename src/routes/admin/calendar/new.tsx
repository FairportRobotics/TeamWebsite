import { CalendarEventForm } from "@/components/admin/calendar/calendar-event-form";
import { BackTo } from "@/components/back-to";
import { PageDescription, PageHeader, PageTitle } from "@/components/page-header";
import { Permissions } from "@/lib/auth/permissions";
import { assertHasAnyPermission } from "@/lib/auth/server";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/calendar/new")({
  beforeLoad: async ({ context }) => {
    assertHasAnyPermission(context.session?.user.role, [Permissions.EventCreate]);
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <BackTo to="/admin/calendar" label="Calendar Admin" />
      <PageHeader>
        <PageTitle>
          Create <span className="text-(--color-destructive)">New Event</span>
        </PageTitle>
        <PageDescription>Create a new Event to appear on the Calendar.</PageDescription>
      </PageHeader>

      <CalendarEventForm />
    </div>
  );
}
