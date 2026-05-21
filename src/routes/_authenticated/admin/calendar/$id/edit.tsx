// prettier-ignore
import { CalendarEventForm } from "@/components/admin/calendar/CalendarEventForm";
import { getCalendarForEditFn } from "@/server/functions/calendar/getCalendarForEdit";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/admin/calendar/$id/edit")({
  beforeLoad: async ({ context }) => {},
  component: RouteComponent,
  loader: async ({ params }) => {
    const results = await getCalendarForEditFn({ data: { id: params.id } });
    return results;
  },
});

function RouteComponent() {
  return (
    <div>
      <CalendarEventForm />
    </div>
  );
}
