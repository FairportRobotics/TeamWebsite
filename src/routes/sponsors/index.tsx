import {
  PageDescription,
  PageHeader,
  PageTitle,
} from "@/components/page-header";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/sponsors/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <PageHeader>
        <PageTitle>
          Our <span className="text-(--color-destructive)">sponsors</span>
        </PageTitle>
        <PageDescription>
          This is where we can display information about and for sponsors.
        </PageDescription>
      </PageHeader>
    </div>
  );
}
