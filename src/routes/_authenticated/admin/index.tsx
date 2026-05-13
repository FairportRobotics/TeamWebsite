// prettier-ignore
import { PageDescription, PageHeader, PageTitle } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAdminSummaryFn } from "@/server/functions/admin/getAdminSummary";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/admin/")({
  beforeLoad: async () => {},
  loader: async () => {
    const metrics = await getAdminSummaryFn();
    return metrics;
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { calendarMetrics } = Route.useLoaderData();
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

      <div className="flex items-center justify-center gap-10">
        <Card className="w-60">
          <CardHeader>
            <CardTitle>Calendar Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-row items-center gap-3">
              <div>{calendarMetrics.find((m) => m.status === "draft")?.count ?? 0}</div>
              <div>Draft(s)</div>
            </div>
            <div className="flex flex-row items-center gap-3">
              <div>{calendarMetrics.find((m) => m.status === "pending_review")?.count ?? 0}</div>
              <div>Pending Approval</div>
            </div>
            <div className="flex flex-row items-center gap-3">
              <div>{calendarMetrics.find((m) => m.status === "published")?.count ?? 0}</div>
              <div>Published</div>
            </div>
            <div className="flex flex-row items-center gap-3">
              <div>{calendarMetrics.find((m) => m.status === "archived")?.count ?? 0}</div>
              <div>Archived</div>
            </div>

            <div className="mt-4">
              <Link to="/admin/calendar" className="underline">
                Manage Calendar Events
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="w-60">
          <CardHeader>
            <CardTitle>Game Years</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-row items-center gap-3">
              <div>0</div>
              <div>Draft(s)</div>
            </div>
            <div className="flex flex-row items-center gap-3">
              <div>0</div>
              <div>Pending Approval</div>
            </div>
            <div className="flex flex-row items-center gap-3">
              <div>0</div>
              <div>Published</div>
            </div>
            <div className="flex flex-row items-center gap-3">
              <div>0</div>
              <div>Archived</div>
            </div>

            <div className="mt-4">
              <Link to="/admin/games" className="underline">
                Manage Game Years
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="w-60">
          <CardHeader>
            <CardTitle>Sponsors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-row items-center gap-3">
              <div>0</div>
              <div>Draft(s)</div>
            </div>
            <div className="flex flex-row items-center gap-3">
              <div>0</div>
              <div>Pending Approval</div>
            </div>
            <div className="flex flex-row items-center gap-3">
              <div>0</div>
              <div>Published</div>
            </div>
            <div className="flex flex-row items-center gap-3">
              <div>0</div>
              <div>Archived</div>
            </div>

            <div className="mt-4">
              <Link to="/admin/sponsors" className="underline">
                Manage Sponsors
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="w-60">
          <CardHeader>
            <CardTitle>Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-row items-center gap-3">
              <div>0</div>
              <div>Draft(s)</div>
            </div>
            <div className="flex flex-row items-center gap-3">
              <div>0</div>
              <div>Pending Approval</div>
            </div>
            <div className="flex flex-row items-center gap-3">
              <div>0</div>
              <div>Published</div>
            </div>
            <div className="flex flex-row items-center gap-3">
              <div>0</div>
              <div>Archived</div>
            </div>

            <div className="mt-4">
              <Link to="/admin/users" className="underline">
                Manage Users
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
