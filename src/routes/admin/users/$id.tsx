import { AccountsTable } from "@/components/admin/users/accounts-table";
import { SessionsTable } from "@/components/admin/users/sessions-table";
import { BackTo } from "@/components/back-to";
import { PageDescription, PageHeader, PageTitle } from "@/components/page-header";
import { PageSection } from "@/components/page-section";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getUserDetailsFn } from "@/lib/fn/user";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/users/$id")({
  component: RouteComponent,
  loader: async ({ params }) => {
    const details = await getUserDetailsFn({ data: { userId: params.id } });
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
            <PageSection>Details</PageSection>
          </CardTitle>
          <CardDescription>
            {user.name} / {user.email}
          </CardDescription>
        </CardHeader>
        <CardContent></CardContent>
      </Card>

      <Card className="mb-10">
        <CardHeader>
          <CardTitle>
            <PageSection>Accounts</PageSection>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <AccountsTable data={accounts} />
        </CardContent>
      </Card>

      <Card className="mb-10">
        <CardHeader>
          <CardTitle>
            <PageSection>Sessions</PageSection>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <SessionsTable data={sessions} />
          <div className="mt-4">
            <Button variant="destructive">Revoke all Sessions</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
