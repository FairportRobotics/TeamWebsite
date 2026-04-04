import { TableCell, TableRow } from "@/components/ui/table";
import type { AdminUser } from "@/lib/server-functions";

export default function AdminUserRow({ user }: { user: AdminUser }) {
  return (
    <TableRow key={user.id}>
      <TableCell>{user.name}</TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell>{user.role ?? "visitor"}</TableCell>
      <TableCell className="text-right">{user.sessions.length}</TableCell>
      <TableCell className="text-right">{user.accounts.length}</TableCell>
      <TableCell>TBD</TableCell>
    </TableRow>
  );
}
