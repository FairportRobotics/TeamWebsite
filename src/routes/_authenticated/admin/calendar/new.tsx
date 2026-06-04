import { EventForm, type CalendarFormValues } from "@/components/admin/calendar/EventForm";
import { BackTo } from "@/components/site/BackTo";
import { PageDescription, PageHeader, PageTitle } from "@/components/site/PageHeader";
import type { VisibleEnumType } from "@/db/schema";
import { createEventFn } from "@/server/functions/calendar/createEvent";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/admin/calendar/new")({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();

  async function handleSubmit(value: CalendarFormValues) {
    await createEventFn({
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

    toast.success("Calendar event was successfully created");
    router.navigate({ to: "/admin/calendar" });
  }

  // Create a default empty calendar form values object.
  const emptyCalendar: CalendarFormValues = {
    id: undefined,
    eventId: undefined,
    status: "draft",
    title: "",
    description: "",
    location: "",
    dates: [],
    visibleTo: ["everyone"],
    signupLinkVisibleTo: ["everyone"],
  };

  return (
    <div>
      <BackTo to="/admin/calendar" label="Calendar Admin" />
      <PageHeader>
        <PageTitle>
          Create <span className="text-(--color-destructive)">New Event</span>
        </PageTitle>
        <PageDescription>Create a new Event to appear on the Calendar.</PageDescription>
      </PageHeader>

      <EventForm defaultValues={emptyCalendar} onSubmit={(values) => handleSubmit(values)} />
    </div>
  );
}
