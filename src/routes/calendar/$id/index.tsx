import { getPublishedCalendarItemsFn } from "@/lib/fn/calendar";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/calendar/$id/")({
  component: RouteComponent,
  loader: async ({ context }) => {
    const events = await getPublishedCalendarItemsFn();
    return events;
  },
});

function RouteComponent() {
  const events = Route.useLoaderData();
  return <div>Hello "/calendar/$id/"!</div>;
}
