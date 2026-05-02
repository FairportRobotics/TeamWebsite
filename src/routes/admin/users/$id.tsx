import { authClient } from "@/lib/auth/auth-client";
import { getSessionFn } from "@/lib/auth/server";
import { getUserListFn } from "@/lib/fn/user";
import { createFileRoute, useNavigate, useRouter } from "@tanstack/react-router";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/users/$id")({
  component: RouteComponent,
  loader: async () => {
    const [session, users] = await Promise.all([getSessionFn(), getUserListFn()]);

    return {
      users,
      selfId: session?.user.id,
    };
  },
});

function RouteComponent() {
  const { refetch } = authClient.useSession();
  // const { users, selfId, canBan, canImpersonate, canRevokeSessions, canDelete } =
  //   Route.useLoaderData();
  const router = useRouter();
  const navigate = useNavigate();

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

  return <div>Hello "/admin/user/$id"!</div>;
}
