import { PageDescription, PageHeader, PageTitle } from "@/components/site/PageHeader";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/unauthorized")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <PageHeader>
        <PageTitle>
          Naughty, <span className="text-destructive">naughty</span>
        </PageTitle>
        <PageDescription className="flex flex-col gap-4">
          <p>It looks like you tried to access an area for which you don't have permission.</p>
          <p>
            If you feel like this is a mistake and you should have access, reach out to one of the
            friendly administrators on Team 578 and they can help you out.
          </p>
        </PageDescription>
      </PageHeader>
    </div>
  );
}
