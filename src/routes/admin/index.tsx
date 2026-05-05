// prettier-ignore
import { PageDescription, PageHeader, PageTitle } from "@/components/page-header";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <PageHeader>
        <PageTitle>
          Site <span className="text-(--color-destructive)">Administration</span>
        </PageTitle>
        <PageDescription>
          Manage site content. Maybe counts of interesting things like total, number waiting to be
          approved...
        </PageDescription>
      </PageHeader>

      <ul>
        <li>
          <Link to="/admin/events">Manage Events</Link>
        </li>
        <li>
          <Link to="/admin/games">Manage Game Years</Link>
        </li>
        <li>
          <Link to="/admin/sponsors">Manage Sponsors</Link>
        </li>
        <li>
          <Link to="/admin/users">Manage Users</Link>
        </li>
      </ul>
    </div>
  );
}
