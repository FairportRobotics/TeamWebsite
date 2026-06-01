// prettier-ignore
import { CalendarEventForm, type CalendarFormValues } from "@/components/admin/calendar/CalendarEventForm";
import { BackTo } from "@/components/site/BackTo";
import type { VisibleEnumType } from "@/db/schema";
import { getCalendarForEditFn } from "@/server/functions/calendar/getCalendarForEdit";
import { updateCalendarFn } from "@/server/functions/calendar/updateCalendar";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/admin/calendar/$id/edit")({
  component: RouteComponent,
  loader: async ({ params }) => {
    const event = await getCalendarForEditFn({ data: { id: params.id } });
    return event;
  },
});

function RouteComponent() {
  const event = Route.useLoaderData();

  if (!event) {
    return <div>Calendar not found</div>;
  }

  async function handleSubmit(value: CalendarFormValues) {
    console.log("handleSubmit form with values:", value);
    await updateCalendarFn({
      data: {
        id: value.id!,
        title: value.title,
        description: value.description,
        location: value.location,
        visibleTo: value.visibleTo as VisibleEnumType[],
        dates: value.dates,
        informationLink: value.informationLink,
        signupLink: value.signupLink,
        signupLinkVisibleTo: value.signupLinkVisibleTo as VisibleEnumType[],
      },
    });

    toast.success("Calendar event was successfully saved");
  }

  const defaultValues: CalendarFormValues = {
    id: event.id,
    title: event.title,
    description: (event.description ?? []).join("\r\n"),
    location: event.location,
    dates: event.dates.map((date) => ({
      id: date.id,
      startAt: new Date(date.startAt),
      endAt: new Date(date.endAt),
    })),
    visibleTo: event.visibleTo ?? [],
    signupLinkVisibleTo: event.signupLinkVisibleTo ?? [],
  };

  return (
    <div>
      <BackTo to="/admin/calendar" label="Calendar Admin" />
      <CalendarEventForm
        defaultValues={defaultValues}
        onSubmit={(values) => handleSubmit(values)}
      />
    </div>
  );
}
