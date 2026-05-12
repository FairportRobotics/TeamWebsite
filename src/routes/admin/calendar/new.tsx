import { CalendarEventForm } from "@/components/admin/calendar/calendar-event-form";
import { BackTo } from "@/components/back-to";
import { PageDescription, PageHeader, PageTitle } from "@/components/page-header";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/calendar/new")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <BackTo to="/admin/calendar" label="Calendar Admin" />
      <PageHeader>
        <PageTitle>
          Create New <span className="text-(--color-destructive)">Event</span>
        </PageTitle>
        <PageDescription>Create a new Event to appear on the Calendar.</PageDescription>
      </PageHeader>

      <CalendarEventForm />
    </div>
  );
}
