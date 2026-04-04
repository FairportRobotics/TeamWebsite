import AdminUserRow from "@/components/admin-user-row";
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
import { getSessionFn, getUsersForAdmin } from "@/lib/server-functions";
import { createFileRoute } from "@tanstack/react-router";

// TODO: Implement beforeLoad and check roles/permissions to ensure only admins can access this route and data.
export const Route = createFileRoute("/admin/")({
  component: RouteComponent,
  loader: async () => {
    const session = await getSessionFn();
    const usersForAdmin = await getUsersForAdmin();
    return { users: usersForAdmin, selfId: session?.user.id };
  },
});

function RouteComponent() {
  const { users, selfId } = Route.useLoaderData();
  return (
    <div>
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
                    <TableHead>Role</TableHead>
                    <TableHead className="text-right">
                      Active Sessions
                    </TableHead>
                    <TableHead className="text-right">
                      Related Accounts
                    </TableHead>
                    <TableHead className="text-center">Actions</TableHead>
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
