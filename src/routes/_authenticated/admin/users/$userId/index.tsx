import { AccountsSection } from "@/components/admin/users/AccountsSection";
import { SessionsSection } from "@/components/admin/users/SessionsSection";
import { BackTo } from "@/components/site/BackTo";
import { PageDescription, PageHeader, PageTitle } from "@/components/site/PageHeader";
import { SectionHeader } from "@/components/site/SectionHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { authClient } from "@/lib/auth/auth-client";
import { userQueries } from "@/queries/userQueries";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, useNavigate, useRouter } from "@tanstack/react-router";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/admin/users/$userId/")({
  component: RouteComponent,
  loader: async ({ params, context }) => {
    context.queryClient?.ensureQueryData(userQueries.details(params.userId));
  },
});

function RouteComponent() {
  const params = Route.useParams();

  const {
    data: { user, accounts, sessions },
  } = useSuspenseQuery(userQueries.details(params.userId));

  const router = useRouter();
  const navigate = useNavigate();

  if (!user) return <div>Loading...</div>;

  function handleUnbanUser() {
    authClient.admin.unbanUser(
      { userId: user!.id },
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
      { userId: user!.id, banReason: "testing 1..2..3.." },
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
      { userId: user!.id },
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
      <BackTo to="/admin/users" label="Back to Users" />
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

      <div className="flex flex-col gap-6">
        <AccountsSection data={accounts} />
        <SessionsSection data={sessions} userId={user.id} />
      </div>
    </div>
  );
}
