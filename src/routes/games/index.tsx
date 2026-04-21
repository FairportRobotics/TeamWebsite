import {
  PageDescription,
  PageHeader,
  PageTitle,
} from "@/components/page-header";
import { getGameYearsFn } from "@/lib/server-functions";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/games/")({
  component: RouteComponent,
  loader: async () => {
    const years = await getGameYearsFn();
    return years;
  },
});

function RouteComponent() {
  const years = Route.useLoaderData();
  return (
    <div className="">
      <PageHeader>
        <PageTitle>
          FIRST <span className="text-(--color-destructive)">games</span>
        </PageTitle>
        <PageDescription>
          This is where we can list each game year and include the robot name
          and any other awards or accolades we achieved.
        </PageDescription>
      </PageHeader>

      {years.map((game) => (
        <div key={game.year} className="my-4 rounded border p-4">
          <div className="flex flex-row items-start justify-between">
            <h2 className="text-xl font-bold">
              {game.year}: {game.name}
            </h2>
          </div>

          <p>Hello</p>
        </div>
      ))}
    </div>
  );
}
