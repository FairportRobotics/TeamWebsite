import { EditDraftPage } from "@/features/admin/event/draft/edit-draft-event-page";
import { getDraftEvent } from "@/server/functions/calendar/getDraftEvent";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/admin/calendar/$id/draft")({
  component: EditDraftPage,
  loader: async ({ params }) => {
    const event = await getDraftEvent({ data: { id: params.id } });
    return event;
  },
});
