import { CalendarEventForm } from "@/components/admin/calendar/CalendarEventForm";
import { BackTo } from "@/components/site/BackTo";
import { PageDescription, PageHeader, PageTitle } from "@/components/site/PageHeader";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/admin/calendar/new")({
  beforeLoad: async ({ context }) => {},
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
