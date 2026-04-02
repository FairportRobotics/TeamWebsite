import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h1>User Admimnistration</h1>
      <ul>
        <li></li>
      </ul>
    </div>
  );
}
