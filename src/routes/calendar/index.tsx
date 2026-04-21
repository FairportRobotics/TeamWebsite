import {
  PageDescription,
  PageHeader,
  PageTitle,
} from "@/components/page-header";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/calendar/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <PageHeader>
        <PageTitle>
          Team <span className="text-(--color-destructive)">events</span>
        </PageTitle>
        <PageDescription>
          This is where we can display information about upcoming events
        </PageDescription>
      </PageHeader>
    </div>
  );
}
