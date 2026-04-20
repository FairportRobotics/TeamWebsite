import {
  PageDescription,
  PageHeader,
  PageTitle,
} from "@/components/page-header";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/contact")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <PageHeader>
      <PageTitle>
        Get in <span className="text-red-600">touch</span>
      </PageTitle>
      <PageDescription>
        Do you have quetions about our team, sponsorship opportunities, or how
        you might be able to help the team? Please reach out to us. We'd love to
        hear from you.
      </PageDescription>
    </PageHeader>
  );
}
