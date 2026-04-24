import { BackTo } from "@/components/back-to";
import {
  PageDescription,
  PageHeader,
  PageTitle,
} from "@/components/page-header";
import { getTeamMemberFn } from "@/lib/fn/user";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/team/$id")({
  component: RouteComponent,
  loader: async ({ params }) => {
    const teamMember = await getTeamMemberFn({
      data: { userId: params.id },
    });

    return teamMember;
  },
});

function RouteComponent() {
  const teamMember = Route.useLoaderData();

  return (
    <div>
      <BackTo to="/team" label="Back to Team" />
      <PageHeader>
        <PageTitle>
          Team <span className="text-(--color-destructive)">Member</span>
        </PageTitle>
        <PageDescription className="flex flex-col gap-2">
          <p>How about this one...</p>
        </PageDescription>
      </PageHeader>

      <div>{teamMember.name}</div>
      <div>{teamMember.email}</div>
      <div>{teamMember.role}</div>
      <div>{teamMember.image}</div>
    </div>
  );
}
