// prettier-ignore
import { BackTo } from "@/components/site/BackTo";
import { PageDescription, PageHeader, PageTitle } from "@/components/site/PageHeader";
import { TeamActionButton } from "@/components/site/TeamActionButtom";
import { seedGameYearsFn } from "@/server/functions/game/seed";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/admin/games")({
  beforeLoad: async ({ context }) => {},
  component: RouteComponent,
});

function RouteComponent() {
  async function handleSeedGames() {
    await seedGameYearsFn();
    return { error: null };
  }

  return (
    <div>
      <BackTo to="/admin" label="Back to Admin" />
      <PageHeader>
        <PageTitle>
          Game Year <span className="text-destructive">Administration</span>
        </PageTitle>
        <PageDescription>Manage game years, robots and sparketing efforts.</PageDescription>
      </PageHeader>
      <TeamActionButton
        variant="destructive"
        className="mt-4"
        action={() => {
          return handleSeedGames();
        }}
      >
        Seed Games
      </TeamActionButton>
    </div>
  );
}
