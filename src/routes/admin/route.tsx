import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/admin")({
  beforeLoad: async ({ context }) => {
    // TODO:
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <Outlet />
    </div>
  );
}
