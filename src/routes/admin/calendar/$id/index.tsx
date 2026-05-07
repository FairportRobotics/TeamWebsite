import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/calendar/$id/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/admin/calendar/$id/"!</div>;
}
