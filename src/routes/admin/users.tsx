import AdminUserRow from "@/components/admin-user-row";
import { BackTo } from "@/components/back-to";
import {
  PageDescription,
  PageHeader,
  PageTitle,
} from "@/components/page-header";
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
import { Permissions } from "@/lib/auth/permissions";
import {
  assertHasPermissionFn,
  getSessionFn,
  hasPermissionFn,
} from "@/lib/auth/server";
import { getUserListFn } from "@/lib/fn/user";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/users")({
  beforeLoad: async () => {
    await assertHasPermissionFn({
      data: {
        requiredPermission: Permissions.UserAdminister,
      },
    });
  },
  component: RouteComponent,
  loader: async () => {
    const [
      session,
      users,
      canBan,
      canImpersonate,
      canRevokeSessions,
      canDelete,
    ] = await Promise.all([
      getSessionFn(),
      getUserListFn(),
      hasPermissionFn({
        data: { requiredPermission: Permissions.AdminUserBan },
      }),
      hasPermissionFn({
        data: { requiredPermission: Permissions.AdminUserImpersonate },
      }),
      hasPermissionFn({
        data: { requiredPermission: Permissions.AdminUserRevokeSessions },
      }),
      hasPermissionFn({
        data: { requiredPermission: Permissions.UserDelete },
      }),
    ]);

    return {
      users,
      selfId: session?.user.id,
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
      </div>
    </div>
  );
}
