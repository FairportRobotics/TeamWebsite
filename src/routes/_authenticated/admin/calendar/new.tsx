import { NewEventPage } from "@/features/admin/event/new/new-event.page";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/admin/calendar/new")({
  component: NewEventPage,
});
