import { UserListTable } from "@/components/admin/users/users-list-table";
import { BackTo } from "@/components/back-to";
import { PageDescription, PageHeader, PageTitle } from "@/components/page-header";
import { SectionHeader } from "@/components/section-header";
import { getListForAdminFn } from "@/server/functions/user/getListForAdmin";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/admin/users/")({
  beforeLoad: async ({ context }) => {},
  component: RouteComponent,
  loader: async ({ context }) => {
    // Pull needed data from the context.
    const userId = context.session?.user.id;

    // Get all the users.
    const users = await getListForAdminFn();

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
      <BackTo to="/admin" label="Back to Admin" />
      <PageHeader>
        <PageTitle>
          User <span className="text-(--color-destructive)">Administration</span>
        </PageTitle>
        <PageDescription>
          Manage users, roles, permissions, and other administrative tasks for the website.
        </PageDescription>
      </PageHeader>

      <SectionHeader>Users ({users.length})</SectionHeader>

      <UserListTable data={users} currentUserId={selfId!} />
    </div>
  );
}
