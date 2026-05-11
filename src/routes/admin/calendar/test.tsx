import { TestForm } from "@/components/test-form";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/calendar/test")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <TestForm />
    </div>
  );
}
