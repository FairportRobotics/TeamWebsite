import { EventDetailsPage } from "@/features/admin/events/details/event-details.page";
import { getEventListDetailsFn } from "@/server/functions/calendar/getEventDetails";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/admin/calendar/$id/")({
  component: EventDetailsPage,
  loader: async ({ params }) => {
    const results = await getEventListDetailsFn({ data: { id: params.id } });
    return results;
  },
});
