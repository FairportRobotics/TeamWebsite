import { BackTo } from "@/components/site/BackTo";
import { PageHeader, PageTitle } from "@/components/site/PageHeader";
import type { VisibleEnumType } from "@/db/schema";
import { CommonEventForm, type CalendarFormValues } from "@/features/admin/events/_common/common-event.form";
import { updatePublishedEventSchema } from "@/features/admin/events/published/update-published-event.schema";
import { updatePublishedEventFn } from "@/server/functions/calendar/updatePublishedEvent";
import { useLoaderData } from "@tanstack/react-router";
import { toast } from "sonner";

export function EditPublisedPage() {
  const event = useLoaderData({ from: "/_authenticated/admin/calendar/$id/published" });

  if (!event) return null;

  const defaultValues: CalendarFormValues = {
    id: event.id,
    eventId: event.id,
    title: event.title,
    description: event.description,
    location: event.location,
    dates: event.dates,
    visibleTo: event.visibleTo ?? [],
    informationLink: event.informationLink ?? "",
    signupLink: event.signupLink ?? "",
    signupLinkVisibleTo: event.signupLinkVisibleTo ?? [],
  };

  async function handleSubmit(value: CalendarFormValues) {
    await updatePublishedEventFn({
      data: {
        id: value.id!,
        eventId: value.eventId!,
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

    toast.success("Event was successfully update");
  }

  return (
    <div>
      <BackTo to="/admin/calendar" label="Calendar Admin" />
      <PageHeader>
        <PageTitle>
          Edit <span className="text-destructive">Published Event</span>
        </PageTitle>
      </PageHeader>

      <CommonEventForm
        defaultValues={defaultValues}
        zodSchema={updatePublishedEventSchema}
        onSubmit={(values) => handleSubmit(values)}
      />
    </div>
  );
}
