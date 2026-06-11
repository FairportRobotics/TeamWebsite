import { EditPublisedPage } from "@/features/admin/event/published/edit-published-event-page";
import { getPublishedEventFn } from "@/server/functions/calendar/getPublishedEvent";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/admin/calendar/$id/published")({
  component: EditPublisedPage,
  loader: async ({ params }) => {
    const event = await getPublishedEventFn({ data: { id: params.id } });
    return event;
  },
});
