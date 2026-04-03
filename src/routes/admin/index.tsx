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
import { authClient } from "@/lib/auth-client";
import { getUserAccountsFn, getUserSessionsFn } from "@/lib/server-functions";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/")({
  component: RouteComponent,
  loader: async () => {
    // const results = await auth.api.listUsers();

    const { data, error } = await authClient.admin.listUsers({
      query: { sortBy: "name", sortDirection: "asc" },
    });

    if (error) {
      return [];
    }

    const userSessions = await getUserSessionsFn();
    const userAccounts = await getUserAccountsFn();

    const users = data.users.map((user) => {
      const activeSessions = userSessions.filter(
        (session) => session.userId === user.id,
      );

      const activeAccounts = userAccounts.filter(
        (account) => account.userId === user.id,
      );
      return { ...user, activeSessions, activeAccounts };
    });

    return users;
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
                    <TableHead>Created</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Active Sessions</TableHead>
                    <TableHead>From Accounts</TableHead>
                    <TableHead className="w-25">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.createdAt.toISOString()}</TableCell>
                      <TableCell>{user.role ?? "visitor"}</TableCell>
                      <TableCell>
                        <ul>
                          {user.activeSessions.map((session) => (
                            <li key={session.id}>
                              Session ID: {session.id}
                              <br></br>Expires At:{" "}
                              {session.expiresAt.toISOString()}
                            </li>
                          ))}
                        </ul>
                      </TableCell>
                      <TableCell>
                        <ul>
                          {user.activeAccounts.map((account) => (
                            <li key={account.id}>* {account.providerId}</li>
                          ))}
                        </ul>
                      </TableCell>
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
