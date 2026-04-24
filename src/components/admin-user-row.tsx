// prettier-ignore
import { TableCell, TableRow } from "@/components/ui/table";
import { authClient } from "@/lib/auth-client";
import type { AdminUser } from "@/lib/fn/user";
import { Link, useNavigate, useRouter } from "@tanstack/react-router";
import { MoreHorizontal } from "lucide-react";
import { toast } from "sonner";
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
import { Badge } from "./ui/badge";
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
  const { refetch } = authClient.useSession();
  const router = useRouter();
  const navigate = useNavigate();
  const isSelf = selfId === user.id;

  async function handleImpersonateUser(userId: string) {
    authClient.admin.impersonateUser(
      { userId },
      {
        onError: (error) => {
          toast.error(error.error.message || "Failed to impersonate user");
        },
        onSuccess: () => {
          refetch();
          navigate({ to: "/" });
        },
      },
    );
  }

  async function handleRevokeSessions(userId: string) {
    authClient.admin.revokeUserSessions(
      { userId },
      {
        onError: (error) => {
          toast.error(error.error.message || "Failed to revoke user sessions");
        },
        onSuccess: () => {
          toast.success("User sessions were revoked");
          router.invalidate();
        },
      },
    );
  }
  // TODO: Add the ban reason as a dialog or something.
  async function handleBanUser(userId: string) {
    authClient.admin.banUser(
      { userId },
      {
        onError: (error) => {
          toast.error(error.error.message || "Failed to ban user");
        },
        onSuccess: () => {
          toast.success("User was banned");
          router.invalidate();
        },
      },
    );
  }

  async function handleUnbanUser(userId: string) {
    authClient.admin.unbanUser(
      { userId },
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

  async function handleRemoveUser(userId: string) {}

  // TODO: Use selfId to disable actions for the current user (e.g. deleting own account, changing own role, etc.)
  return (
    <TableRow>
      <TableCell>
        <Link to="/admin/user/$id" params={{ id: user.id }} className="underline">
          {user.name}
        </Link>
        {user.banned && (
          <Badge variant="destructive" className="py-1 px-2">
            Banned
          </Badge>
        )}
        {isSelf && <Badge className="py-1 px-2 ml-2 bg-orange-400">You</Badge>}
      </TableCell>
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
                <DropdownMenuItem onClick={() => handleImpersonateUser(user.id)}>
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
                  <DropdownMenuItem variant="destructive">Delete User</DropdownMenuItem>
                </AlertDialogTrigger>
              </DropdownMenuContent>
            </DropdownMenu>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete User</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete this user? This action cannot be undone.
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
