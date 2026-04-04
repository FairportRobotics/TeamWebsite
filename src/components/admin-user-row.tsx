import { TableCell, TableRow } from "@/components/ui/table";
import type { AdminUser } from "@/lib/server-functions";
import { MoreHorizontal } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default function AdminUserRow({
  user,
  selfId,
}: {
  user: AdminUser;
  selfId: string | undefined;
}) {
  const isSelf = selfId === user.id;

  async function handleImpersonateUser(userId: string) {}

  async function handleRevokeSessions(userId: string) {}

  async function handleUnbanUser(userId: string) {}

  async function handleBanUser(userId: string) {}

  async function handleRemoveUser(userId: string) {}

  // TODO: Use selfId to disable actions for the current user (e.g. deleting own account, changing own role, etc.)
  return (
    <TableRow>
      <TableCell>{user.name}</TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell>{user.role ?? "visitor"}</TableCell>
      <TableCell className="text-right">{user.sessions.length}</TableCell>
      <TableCell className="text-right">{user.accounts.length}</TableCell>
      <TableCell className="text-center">
        {!isSelf && (
          <AlertDialog>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  onClick={() => handleImpersonateUser(user.id)}
                >
                  Impersonate
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleRevokeSessions(user.id)}>
                  Revoke Sessions
                </DropdownMenuItem>
                {user.banned ? (
                  <DropdownMenuItem onClick={() => handleUnbanUser(user.id)}>
                    Unban User
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem onClick={() => handleBanUser(user.id)}>
                    Ban User
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />

                <AlertDialogTrigger asChild>
                  <DropdownMenuItem variant="destructive">
                    Delete User
                  </DropdownMenuItem>
                </AlertDialogTrigger>
              </DropdownMenuContent>
            </DropdownMenu>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete User</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete this user? This action cannot
                  be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => handleRemoveUser(user.id)}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </TableCell>
    </TableRow>
  );
}
