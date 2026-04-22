import {
  PageDescription,
  PageHeader,
  PageTitle,
} from "@/components/page-header";
import { Permissions } from "@/lib/auth/permissions";
import { hasPermissionFn } from "@/lib/auth/server";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/")({
  loader: async () => {
    const [canSeeEvents, canSeeGames, canSeeSponsors, canSeeUsers] =
      await Promise.all([
        hasPermissionFn({
          data: { requiredPermission: Permissions.EventAdminister },
        }),
        hasPermissionFn({
          data: { requiredPermission: Permissions.GameYearAdminister },
        }),
        hasPermissionFn({
          data: { requiredPermission: Permissions.SponsorAdminister },
        }),
        hasPermissionFn({
          data: { requiredPermission: Permissions.UserAdminister },
        }),
      ]);

    return { canSeeEvents, canSeeGames, canSeeSponsors, canSeeUsers };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { canSeeEvents, canSeeGames, canSeeSponsors, canSeeUsers } =
    Route.useLoaderData();
  return (
    <div>
      <PageHeader>
        <PageTitle>
          Site{" "}
          <span className="text-(--color-destructive)">Administration</span>
        </PageTitle>
        <PageDescription>Manage site content.</PageDescription>
      </PageHeader>

      <ul>
        {canSeeEvents && (
          <li>
            <Link to="/admin/events">Manage Events</Link>
          </li>
        )}
        {canSeeGames && (
          <li>
            <Link to="/admin/game-years">Manage Game Years</Link>
          </li>
        )}
        {canSeeSponsors && (
          <li>
            <Link to="/admin/sponsors">Manage Sponsors</Link>
          </li>
        )}
        {canSeeUsers && (
          <li>
            <Link to="/admin/users">Manage Users</Link>
          </li>
        )}
      </ul>
    </div>
  );
}
