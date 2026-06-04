// prettier-ignore
import { PageDescription, PageHeader, PageTitle } from "@/components/site/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getAdminSummaryFn } from "@/server/functions/admin/getAdminSummary";
import { createFileRoute, Link } from "@tanstack/react-router";
import { BookAlert, BookDashed, BookMinus, BookPlus } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin/")({
  beforeLoad: async () => {},
  loader: async () => {
    const metrics = await getAdminSummaryFn();
    return metrics;
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { draftMetrics, publishedMetrics } = Route.useLoaderData();

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

      <div className="flex items-top justify-center gap-10">
        <Card className="w-60">
          <CardHeader>
            <CardTitle>Calendar Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              <h2>Published</h2>
              <div className="flex flex-row items-center gap-3">
                <BookPlus className="text-chart-4" />
                <div>{publishedMetrics?.upcoming ?? 0}</div>
                <div>Upcoming</div>
              </div>
              <div className="flex flex-row items-center gap-3">
                <BookMinus className="text-chart-2" />
                <div>{publishedMetrics?.elapsed ?? 0}</div>
                <div>Elapsed</div>
              </div>

              <Separator className="p-0.5" />

              <h2>Drafts</h2>
              <div className="flex flex-row items-center gap-3">
                <BookAlert className="text-chart-5" />
                <div>{draftMetrics.find((m) => m.status === "pending")?.count ?? 0}</div>
                <div>Pending Approval</div>
              </div>
              <div className="flex flex-row items-center gap-3">
                <BookDashed className="text-chart-3" />
                <div>{draftMetrics.find((m) => m.status === "draft")?.count ?? 0}</div>
                <div>Drafts</div>
              </div>
            </div>
            <div className="mt-4">
              <Link to="/admin/calendar" className="underline text-primary">
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
              <Link to="/admin/games" className="underline text-primary">
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
              <Link to="/admin/sponsors" className="underline text-primary">
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
              <Link to="/admin/users" className="underline text-primary">
                Manage Users
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
