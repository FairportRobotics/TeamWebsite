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

      <ul className="list-disc">
        <li>Display calendaro of current month with Events filled in.</li>
        <li>
          For Coach, Mentor, Student, Parent, display Team Events which are not
          open to the public. For example, Potluck Rodeo.
        </li>
        <li>
          Allow visitors to toggle between calendar and list view of events.
          List view should show upcoming events in chronological order with the
          most recent events at the top of the list.
        </li>
        <li>
          Coach, Mentor Roles: Provide a means of editing the list of Events.
        </li>
      </ul>
    </div>
  );
}
