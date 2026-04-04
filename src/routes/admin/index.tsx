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
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getUsersForAdmin } from "@/lib/server-functions";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/")({
  component: RouteComponent,
  loader: async () => {
    const usersForAdmin = await getUsersForAdmin();

    return usersForAdmin;
  },
});

function RouteComponent() {
  const users = Route.useLoaderData();
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
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.role ?? "visitor"}</TableCell>
                      <TableCell className="text-right">
                        {user.sessions.length}
                      </TableCell>
                      <TableCell className="text-right">
                        {user.accounts.length}
                      </TableCell>
                      <TableCell>TBD</TableCell>
                    </TableRow>
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
