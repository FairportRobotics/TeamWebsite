import { EventForm, type CalendarFormValues } from "@/components/admin/calendar/EventForm";
import { BackTo } from "@/components/site/BackTo";
import type { VisibleEnumType } from "@/db/schema";
import { getPublishedEventFn } from "@/server/functions/calendar/getPublishedEvent";
import { updatePublishedEventFn } from "@/server/functions/calendar/updatePublishedEvent";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/admin/calendar/$id/published")({
  component: RouteComponent,
  loader: async ({ params }) => {
    const event = await getPublishedEventFn({ data: { id: params.id } });
    return event;
  },
});

function RouteComponent() {
  const event = Route.useLoaderData();
  const router = useRouter();

  if (!event) {
    return <div>Event not found</div>;
  }

  const defaultValues: CalendarFormValues = {
    id: event.id,
    eventId: event.id,
    status: "draft",

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
  };

  async function handleSubmit(value: CalendarFormValues) {
    await updatePublishedEventFn({
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
    router.navigate({ to: "/admin/calendar/$id/draft", params: { id: value.id! } });
  }

  return (
    <div>
      <BackTo to="/admin/calendar" label="Back to Event Admin" />
      <EventForm defaultValues={defaultValues} onSubmit={(values) => handleSubmit(values)} />
    </div>
  );
}
