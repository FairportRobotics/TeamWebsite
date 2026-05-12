// prettier-ignore
import { CalendarEventForm } from "@/components/admin/calendar/calendar-event-form";
import { Permissions } from "@/lib/auth/permissions";
import { assertHasAnyPermission } from "@/lib/auth/server";
import { getCalendarForEditFn } from "@/server/functions/calendar/getCalendarForEdit";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/calendar/$id/edit")({
  beforeLoad: async ({ context }) => {
    assertHasAnyPermission(context.session?.user.role, [Permissions.EventUpdate]);
  },
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
