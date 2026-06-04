import { UsersSection } from "@/components/admin/users/UsersSection";
import { BackTo } from "@/components/site/BackTo";
import { PageDescription, PageHeader, PageTitle } from "@/components/site/PageHeader";
import { userQueries } from "@/queries/userQueries";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/admin/users/")({
  component: RouteComponent,
  loader: async ({ context }) => {
    context.queryClient?.ensureQueryData(userQueries.list());
    const userId = context.auth.user?.id;

    return {
      selfId: userId,
    };
  },
});

function RouteComponent() {
  const { selfId } = Route.useLoaderData();

  return (
    <div className="">
      <BackTo to="/admin" label="Back to Admin" />
      <PageHeader>
        <PageTitle>
          User <span className="text-destructive">Administration</span>
        </PageTitle>
        <PageDescription>
          Manage users, roles, permissions, and other administrative tasks for the website.
        </PageDescription>
      </PageHeader>

      <UsersSection currentUserId={selfId!} />
    </div>
  );
}
