import { BackTo } from "@/components/site/BackTo";
import { PageHeader, PageTitle } from "@/components/site/PageHeader";
import type { VisibleEnumType } from "@/db/schema";
import { CommonEventForm, type CalendarFormValues } from "@/features/admin/event/_common/common-event.form";
import { updateDraftEventSchema } from "@/features/admin/event/schemas/update-draft-event.schema";
import { updateDraftEventFn } from "@/server/functions/calendar/updateDraftEvent";
import { useLoaderData } from "@tanstack/react-router";
import { toast } from "sonner";

export function EditDraftPage() {
  const event = useLoaderData({ from: "/_authenticated/admin/calendar/$id/draft" });

  if (!event) return null;

  const defaultValues: CalendarFormValues = {
    id: event.id,
    eventId: event.eventId,
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
    await updateDraftEventFn({
      data: {
        id: value.id!,
        eventId: value.eventId,
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

    toast.success("Event was successfully updated");
  }

  return (
    <div>
      <BackTo to="/admin/calendar" label="Calendar Admin" />
      <PageHeader>
        <PageTitle>
          Edit <span className="text-destructive">Draft Event</span>
        </PageTitle>
      </PageHeader>

      <CommonEventForm
        defaultValues={defaultValues}
        zodSchema={updateDraftEventSchema}
        onSubmit={(values) => handleSubmit(values)}
      />
    </div>
  );
}
