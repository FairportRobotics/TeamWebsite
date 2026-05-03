import { BackTo } from "@/components/back-to";
import { PageDescription, PageHeader, PageTitle } from "@/components/page-header";
import { PageSection } from "@/components/page-section";
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
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>
          {accounts.map((a) => (
            <div>
              {a.id} {a.providerId} : {a.createdAt.toISOString()} :{" "}
              {a.accessTokenExpiresAt?.toISOString()}
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="mb-10">
        <CardHeader>
          <CardTitle>
            <PageSection>Sessions</PageSection>
          </CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>
          {sessions.map((s) => (
            <div>
              {s.id} : {s.createdAt.toISOString()} : {s.expiresAt.toISOString()} :{" "}
              {s.impersonatedBy} : {s.ipAddress} : {s.updatedAt.toISOString()} : {s.userAgent}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
