// prettier-ignore
import { BackTo } from "@/components/site/BackTo";
import { PageDescription, PageHeader, PageTitle } from "@/components/site/PageHeader";
import { TeamActionButton } from "@/components/site/TeamActionButtom";
import { getSponsorListFn } from "@/server/functions/sponsor/getSponsorList";
import { seedSponsorsFn } from "@/server/functions/sponsor/seed";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/admin/sponsors")({
  beforeLoad: async () => {},
  loader: async () => {
    const sponsors = await getSponsorListFn();
    return sponsors;
  },
  component: RouteComponent,
});

function RouteComponent() {
  async function handleSeedGames() {
    await seedSponsorsFn();
    return { error: null };
  }

  return (
    <div>
      <BackTo to="/admin" label="Back to Admin" />
      <PageHeader>
        <PageTitle>
          Sponsor <span className="text-(--color-destructive)">Administration</span>
        </PageTitle>
        <PageDescription>Manage sponsors.</PageDescription>
      </PageHeader>
      <TeamActionButton
        variant="destructive"
        className="mt-4"
        action={() => {
          return handleSeedGames();
        }}
      >
        Seed Sponsors
      </TeamActionButton>
    </div>
  );
}
