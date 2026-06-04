import { EventForm, type CalendarFormValues } from "@/components/admin/calendar/EventForm";
import { BackTo } from "@/components/site/BackTo";
import type { VisibleEnumType } from "@/db/schema";
import { getDraftEvent } from "@/server/functions/calendar/getDraftEvent";
import { updateDraftEventFn } from "@/server/functions/calendar/updateDraftEvent";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/admin/calendar/$id/draft")({
  component: RouteComponent,
  loader: async ({ params }) => {
    const event = await getDraftEvent({ data: { id: params.id } });
    return event;
  },
});

function RouteComponent() {
  const event = Route.useLoaderData();

  if (!event) {
    return <div>Event not found</div>;
  }

  const defaultValues: CalendarFormValues = {
    id: event.id,
    title: event.title,
    description: event.description,
    location: event.location,
    dates: event.dates.map((date) => ({
      id: date.id,
      startAt: new Date(date.startAt),
      endAt: new Date(date.endAt),
    })),
    visibleTo: event.visibleTo ?? [],
    signupLinkVisibleTo: event.signupLinkVisibleTo ?? [],
    status: event.status,
  };

  async function handleSubmit(value: CalendarFormValues) {
    await updateDraftEventFn({
      data: {
        id: value.id!,
        eventId: value.eventId,
        status: "draft",
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

    toast.success("Event was successfully saved");
  }

  return (
    <div>
      <BackTo to="/admin/calendar" label="Back to Event Admin" />
      <EventForm defaultValues={defaultValues} onSubmit={(values) => handleSubmit(values)} />
    </div>
  );
}
