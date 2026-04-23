import { BackTo } from "@/components/back-to";
import {
  PageDescription,
  PageHeader,
  PageTitle,
} from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { seedGameYearsFn } from "@/lib/fn/games";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/games")({
  component: RouteComponent,
});

function RouteComponent() {
  async function handleSeedGames() {
    await seedGameYearsFn();
  }

  return (
    <div>
      <BackTo to="/admin" label="Admin" />
      <PageHeader>
        <PageTitle>
          Game Year{" "}
          <span className="text-(--color-destructive)">Administration</span>
        </PageTitle>
        <PageDescription>
          Manage game years, robots and sparketing efforts.
        </PageDescription>
      </PageHeader>
      <Button className="mt-6" variant="destructive" onClick={handleSeedGames}>
        Seed Games
      </Button>
    </div>
  );
}
