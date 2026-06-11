import { EventDraftsSection } from "@/components/admin/events/EventDraftsSection";
import { EventPublishedSection } from "@/components/admin/events/EventPublishedSection";
import { BackTo } from "@/components/site/BackTo";
import { PageDescription, PageHeader, PageTitle } from "@/components/site/PageHeader";
import { eventQueries } from "@/queries/eventQueries";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/admin/calendar/")({
  component: RouteComponent,
  loader: ({ context }) => {
    context.queryClient?.ensureQueryData(eventQueries.drafts());
    context.queryClient?.ensureQueryData(eventQueries.published());
  },
});

function RouteComponent() {
  return (
    <div>
      <BackTo to="/admin" label="Back to Admin" />
      <PageHeader>
        <PageTitle>
          Calendar <span className="text-destructive">Administration</span>
        </PageTitle>
        <PageDescription>Manage events that appear on the Calendar.</PageDescription>
      </PageHeader>

      <div className="flex flex-col gap-10">
        <EventDraftsSection />
        <EventPublishedSection />
      </div>
    </div>
  );
}
