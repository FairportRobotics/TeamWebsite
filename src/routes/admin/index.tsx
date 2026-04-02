import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h1>Administration Home</h1>
      <ul>
        <li>User Admimnistration</li>
      </ul>
    </div>
  );
}
