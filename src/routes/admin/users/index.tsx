import { UserListTable } from "@/components/admin/users/users-list-table";
import { PageDescription, PageHeader, PageTitle } from "@/components/page-header";
import { PageSection } from "@/components/page-section";
import { getUserListFn } from "@/lib/fn/user";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/users/")({
  component: RouteComponent,
  loader: async ({ context }) => {
    // Pull needed data from the context.
    const userId = context.data?.user.id;

    // Get all the users.
    const users = await getUserListFn();

    return {
      users,
      selfId: userId,
    };
  },
});

function RouteComponent() {
  const { users, selfId } = Route.useLoaderData();

  return (
    <div className="">
      <PageHeader>
        <PageTitle>
          User <span className="text-(--color-destructive)">Administration</span>
        </PageTitle>
        <PageDescription>
          Manage users, roles, permissions, and other administrative tasks for the website.
        </PageDescription>
      </PageHeader>

      <PageSection>Users</PageSection>

      <UserListTable data={users} currentUserId={selfId!} />
    </div>
  );
}
