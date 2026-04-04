import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/user/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/admin/user/$id"!</div>;
}
