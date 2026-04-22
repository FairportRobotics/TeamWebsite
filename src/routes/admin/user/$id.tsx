import { getSessionFn } from "@/lib/auth/server";
import { getUserListFn } from "@/lib/fn/user";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/user/$id")({
  component: RouteComponent,
  loader: async () => {
    const [session, users] = await Promise.all([
      getSessionFn(),
      getUserListFn(),
    ]);

    return {
      users,
      selfId: session?.user.id,
    };
  },
});

function RouteComponent() {
  return <div>Hello "/admin/user/$id"!</div>;
}
