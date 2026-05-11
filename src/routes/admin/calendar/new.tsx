import { CalendarEventForm } from "@/components/admin/calendar/calendar-event-form";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/calendar/new")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <CalendarEventForm />
    </div>
  );
}
