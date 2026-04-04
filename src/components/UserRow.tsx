import { TableCell, TableRow } from "@/components/ui/table";
import type { UserAdminSelect } from "@/lib/server-functions";

export function UserRow({
  userData,
  selfId,
}: {
  userData: UserAdminSelect;
  selfId: string;
}) {
  return (
    <TableRow key={userData.user.id}>
      <TableCell>{userData.user.name}</TableCell>
      <TableCell>{userData.user.email}</TableCell>
      <TableCell>{userData.user.createdAt.toISOString()}</TableCell>
      <TableCell>{userData.user.role ?? "visitor"}</TableCell>
      <TableCell>
        <ul>
          {userData.session?.map((session) => (
            <li key={session.id}>
              Session ID: {session.id}
              <br></br>Expires At: {session.expiresAt.toISOString()}
            </li>
          ))}
        </ul>
      </TableCell>
      <TableCell>
        <ul>
          {accounts.map((account) => (
            <li key={account.id}>* {account.providerId}</li>
          ))}
        </ul>
      </TableCell>
    </TableRow>
  );
}
