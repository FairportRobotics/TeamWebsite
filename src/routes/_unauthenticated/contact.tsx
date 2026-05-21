import { PageDescription, PageHeader, PageTitle } from "@/components/site/PageHeader";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_unauthenticated/contact")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <PageHeader>
      <PageTitle>
        Get in <span className="text-(--color-destructive)">touch</span>
      </PageTitle>
      <PageDescription>
        Do you have quetions about our team, sponsorship opportunities, or how you might be able to
        help the team? Please reach out to us. We'd love to hear from you.
      </PageDescription>
    </PageHeader>
  );
}
