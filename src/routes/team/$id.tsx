import { BackTo } from "@/components/back-to";
import { PageDescription, PageHeader, PageTitle } from "@/components/page-header";
import { getUserDetailsFn } from "@/server/functions/user/getUserDetails";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/team/$id")({
  loader: async ({ params }) => {
    const { user } = await getUserDetailsFn({
      data: { userId: params.id },
    });

    return user;
  },
  component: RouteComponent,
});

function RouteComponent() {
  const user = Route.useLoaderData();

  return (
    <div>
      <BackTo to="/team" label="Back to Team" />
      <PageHeader>
        <PageTitle>
          Team <span className="text-(--color-destructive)">Member</span>
        </PageTitle>
        <PageDescription className="flex flex-col gap-4">
          <p>How about this one...</p>
        </PageDescription>
      </PageHeader>

      <div>{user.name}</div>
      <div>{user.email}</div>
      <div>{user.role}</div>
      <div>{user.image}</div>
    </div>
  );
}
