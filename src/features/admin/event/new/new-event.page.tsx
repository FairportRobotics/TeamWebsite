import { BackTo } from "@/components/site/BackTo";
import { PageHeader, PageTitle } from "@/components/site/PageHeader";
import type { VisibleEnumType } from "@/db/schema";
import { CommonEventForm, type CalendarFormValues } from "@/features/admin/event/_common/common-event.form";
import { createEventSchema } from "@/features/admin/event/schemas/create-event.schema";
import { createEventFn } from "@/server/functions/calendar/createEvent";
import { toast } from "sonner";

export function NewEventPage() {
  const defaultValues: CalendarFormValues = {
    id: null,
    eventId: null,
    title: "",
    description: "",
    location: "",
    dates: [],
    visibleTo: ["everyone"],
    informationLink: "",
    signupLink: "",
    signupLinkVisibleTo: [],
  };

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

    toast.success("Event was successfully created");
  }

  return (
    <div>
      <BackTo to="/admin/calendar" label="Calendar Admin" />
      <PageHeader>
        <PageTitle>
          Create <span className="text-destructive">New Event</span>
        </PageTitle>
      </PageHeader>

      <CommonEventForm
        defaultValues={defaultValues}
        zodSchema={createEventSchema}
        onSubmit={(values) => handleSubmit(values)}
      />
    </div>
  );
}
