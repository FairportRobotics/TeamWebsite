import AdminUserRow from "@/components/admin-user-row";
import { BackTo } from "@/components/back-to";
import {
  PageDescription,
  PageHeader,
  PageTitle,
} from "@/components/page-header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { seedUsers } from "@/db/seed/users";
import { authClient } from "@/lib/auth-client";
import {
  assertHasAnyPermission,
  hasAnyPermission,
} from "@/lib/auth/utils/permissions";
import { getUserListFn } from "@/lib/fn/user";
import { Permissions } from "@/lib/permissions";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/users")({
  beforeLoad: async ({ context }) => {
    assertHasAnyPermission(context.data?.user.role, [
      Permissions.UserAdminister,
    ]);
  },
  component: RouteComponent,
  loader: async ({ context }) => {
    // Pull needed data from the context.
    const userId = context.data?.user.id;
    const userRoles = context.data?.user.role ?? "";

    // Get all the users.
    const users = await getUserListFn();

    // Get fine-grained permissions for UI adjustment.
    const canBan = hasAnyPermission(userRoles, [Permissions.UserBan]);
    const canImpersonate = hasAnyPermission(userRoles, [
      Permissions.UserImpersonate,
    ]);
    const canRevokeSessions = hasAnyPermission(userRoles, [
      Permissions.UserRevokeSessions,
    ]);
    const canDelete = hasAnyPermission(userRoles, [Permissions.UserDelete]);

    return {
      users,
      selfId: userId,
      canBan,
      canImpersonate,
      canRevokeSessions,
      canDelete,
    };
  },
});

function RouteComponent() {
  const {
    users,
    selfId,
    canBan,
    canImpersonate,
    canRevokeSessions,
    canDelete,
  } = Route.useLoaderData();

  const canSeeActions =
    canBan || canImpersonate || canRevokeSessions || canDelete;

  async function handleSeedUsers() {
    console.log("handleSeedUsers");

    seedUsers.forEach(async (u, i) => {
      console.log("Creating user for ", u.name, "...");

      await authClient.admin.createUser(
        {
          email: u.email,
          password: "Password123!",
          name: u.name,
          role: "user",
        },
        {
          onError: (error) => {
            console.error("Error signing up:", error);
          },
        },
      );
    });
  }

  return (
    <div>
      <BackTo to="/admin" label="Admin" />

      <PageHeader>
        <PageTitle>
          User{" "}
          <span className="text-(--color-destructive)">Administration</span>
        </PageTitle>
        <PageDescription>
          Manage users, roles, permissions, and other administrative tasks for
          the website.
        </PageDescription>
      </PageHeader>

      <div className="mx-auto container my-6 px-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Users ({users.length})
            </CardTitle>
            <CardDescription>
              Manage user accounts, roles, and permissions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Roles</TableHead>
                    <TableHead className="text-right">
                      Active Sessions
                    </TableHead>
                    <TableHead className="text-right">
                      Related Accounts
                    </TableHead>
                    {canSeeActions && (
                      <TableHead className="text-center">Actions</TableHead>
                    )}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <AdminUserRow user={user} key={user.id} selfId={selfId} />
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
        <Button
          className="mt-6"
          variant="destructive"
          onClick={handleSeedUsers}
        >
          Seed Users
        </Button>
      </div>
    </div>
  );
}
