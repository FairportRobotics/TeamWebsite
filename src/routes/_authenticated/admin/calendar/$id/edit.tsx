// prettier-ignore
import { CalendarEventForm, type CalendarFormValues } from "@/components/admin/calendar/CalendarEventForm";
import type { VisibleEnumType } from "@/db/schema";
import { createCalendarFn } from "@/server/functions/calendar/createCalendar";
import { getCalendarForEditFn } from "@/server/functions/calendar/getCalendarForEdit";
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

  async function handleSubmit(value: CalendarFormValues) {
    await createCalendarFn({
      data: {
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

  if (!event) {
    return <div>Calendar not found</div>;
  }

  const defaultValues: CalendarFormValues = {
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
      <CalendarEventForm
        defaultValues={defaultValues}
        onSubmit={(values) => handleSubmit(values)}
      />
    </div>
  );
}
