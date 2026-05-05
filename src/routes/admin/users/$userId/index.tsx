import { AccountsTable } from "@/components/admin/users/accounts-table";
import { SessionsTable } from "@/components/admin/users/sessions-table";
import { BackTo } from "@/components/back-to";
import { PageDescription, PageHeader, PageTitle } from "@/components/page-header";
import { SectionHeader } from "@/components/section-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getUserDetailsFn } from "@/lib/fn/user";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/users/$userId/")({
  component: RouteComponent,
  loader: async ({ params }) => {
    const details = await getUserDetailsFn({ data: { userId: params.userId } });
    return details;
  },
});

function RouteComponent() {
  const { user, accounts, sessions } = Route.useLoaderData();

  return (
    <div>
      <BackTo to="/admin/users" label="Users" />
      <PageHeader>
        <PageTitle>{user.name}</PageTitle>
        <PageDescription>
          Manage users, roles, permissions, and other administrative tasks for the website.
        </PageDescription>
      </PageHeader>

      <Card className="mb-10">
        <CardHeader>
          <CardTitle>
            <SectionHeader>Details</SectionHeader>
          </CardTitle>
          <CardDescription>
            <div>
              {user.name} ({user.email})
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-row items-center mt-6 gap-4">
            <div>
              {user.banned ? (
                <div>
                  {user.banned} : {user.banReason} : {user.banExpires?.toISOString()}
                </div>
              ) : (
                <Button variant="destructive">Ban</Button>
              )}
            </div>
            <div>
              <Button>Impersonate</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-10">
        <CardHeader>
          <CardTitle>
            <SectionHeader>Accounts</SectionHeader>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <AccountsTable data={accounts} />
        </CardContent>
      </Card>

      <Card className="mb-10">
        <CardHeader>
          <CardTitle>
            <SectionHeader>Sessions</SectionHeader>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <SessionsTable data={sessions} />
          {sessions.length > 0 && (
            <div className="mt-4">
              <Button variant="destructive">Revoke all Sessions</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
