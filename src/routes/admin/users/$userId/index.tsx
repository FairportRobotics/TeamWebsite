import { AccountsTable } from "@/components/admin/users/accounts-table";
import { SessionsTable } from "@/components/admin/users/sessions-table";
import { BackTo } from "@/components/back-to";
import { PageDescription, PageHeader, PageTitle } from "@/components/page-header";
import { SectionHeader } from "@/components/section-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { authClient } from "@/lib/auth/auth-client";
import { getUserDetailsFn } from "@/server/functions/user/getUserDetails";
import { createFileRoute, useNavigate, useRouter } from "@tanstack/react-router";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/users/$userId/")({
  component: RouteComponent,
  loader: async ({ params }) => {
    const details = await getUserDetailsFn({ data: { userId: params.userId } });
    return details;
  },
});

function RouteComponent() {
  const { user, accounts, sessions } = Route.useLoaderData();
  const router = useRouter();
  const navigate = useNavigate();

  function handleUnbanUser() {
    authClient.admin.unbanUser(
      { userId: user.id },
      {
        onError: (error) => {
          toast.error(error.error.message || "Failed to unban user");
        },
        onSuccess: () => {
          toast.success("User was unbanned");
          router.invalidate();
        },
      },
    );
  }

  function handleBanUser() {
    authClient.admin.banUser(
      { userId: user.id, banReason: "testing 1..2..3.." },
      {
        onError: (error) => {
          toast.error(error.error.message || "Failed to ban user");
        },
        onSuccess: () => {
          toast.success("User was banned");
        },
      },
    );
  }

  function handleImpersonate() {
    authClient.admin.impersonateUser(
      { userId: user.id },
      {
        onError: (error) => {
          toast.error(error.error.message || "Failed to impersonate user");
        },
        onSuccess: () => {
          router.invalidate();
          navigate({ to: "/" });
        },
      },
    );
  }

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
                <Button variant="destructive" onClick={handleUnbanUser}>
                  Unban
                </Button>
              ) : (
                <Button variant="destructive" onClick={handleBanUser}>
                  Ban
                </Button>
              )}
            </div>
            <div>
              <Button onClick={handleImpersonate}>Impersonate</Button>
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
