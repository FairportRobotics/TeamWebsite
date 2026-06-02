import {
  CalendarEventForm,
  type CalendarFormValues,
} from "@/components/admin/calendar/CalendarEventForm";
import { BackTo } from "@/components/site/BackTo";
import { PageDescription, PageHeader, PageTitle } from "@/components/site/PageHeader";
import type { VisibleEnumType } from "@/db/schema";
import { createCalendarFn } from "@/server/functions/calendar/createCalendar";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/admin/calendar/new")({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();

  async function handleSubmit(value: CalendarFormValues) {
    const newEvent = await createCalendarFn({
      data: {
        title: value.title,
        description: value.description,
        location: value.location,
        visibleTo: value.visibleTo as VisibleEnumType[],
        dates: value.dates,
        informationLink: value.informationLink,
        signupLink: value.signupLink,
        signupLinkVisibleTo: value.signupLinkVisibleTo as VisibleEnumType[],
        status: "draft",
      },
    });

    toast.success("Calendar event was successfully created");
    router.navigate({ to: "/admin/calendar/$id/edit", params: { id: newEvent! } });
  }

  // Create a default empty calendar form values object.
  const emptyCalendar: CalendarFormValues = {
    title: "",
    description: "",
    location: "",
    dates: [],
    visibleTo: ["everyone"],
    signupLinkVisibleTo: ["everyone"],
    status: "draft",
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

      <CalendarEventForm
        defaultValues={emptyCalendar}
        onSubmit={(values) => handleSubmit(values)}
      />
    </div>
  );
}
