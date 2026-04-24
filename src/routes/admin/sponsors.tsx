// prettier-ignore
import { BackTo } from "@/components/back-to";
import { PageDescription, PageHeader, PageTitle } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { assertHasAnyPermission } from "@/lib/auth/utils/permissions";
import { getSponsorsFn, seedSponsorsFn } from "@/lib/fn/sponsor";
import { Permissions } from "@/lib/permissions";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/sponsors")({
  beforeLoad: async ({ context }) => {
    assertHasAnyPermission(context.data?.user.role, [Permissions.SponsorAdminister]);
  },
  component: RouteComponent,
  loader: async () => {
    const sponsors = await getSponsorsFn();
    return sponsors;
  },
});

function RouteComponent() {
  const sponsors = Route.useLoaderData();

  async function handleSeedGames() {
    await seedSponsorsFn();
  }

  return (
    <div>
      <BackTo to="/admin" label="Admin" />
      <PageHeader>
        <PageTitle>
          Sponsor <span className="text-(--color-destructive)">Administration</span>
        </PageTitle>
        <PageDescription>Manage sponsors.</PageDescription>
      </PageHeader>
      <Button className="mt-6" variant="destructive" onClick={handleSeedGames}>
        Seed Sponsors
      </Button>
    </div>
  );
}
