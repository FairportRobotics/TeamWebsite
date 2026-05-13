import { PageDescription, PageHeader, PageTitle } from "@/components/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getGameYearsFn } from "@/lib/fn/games";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/_unauthenticated/games/")({
  loader: async () => {
    const games = getGameYearsFn();
    return games;
  },
  component: RouteComponent,
});

function RouteComponent() {
  const games = Route.useLoaderData();

  return (
    <div>
      <PageHeader>
        <PageTitle>
          FIRST <span className="text-(--color-destructive)">games</span>
        </PageTitle>
        <PageDescription>
          This is where we can list each game year and include the robot name and any other awards
          or accolades we achieved.
        </PageDescription>
      </PageHeader>

      <div className="flex flex-row flex-wrap gap-10 items-center justify-center">
        {games.map((g) => (
          <Card key={g.year}>
            <CardContent className="">
              <div className="bg-white flex h-64 w-64 overflow-hidden items-center justify-center p-4 rounded-md">
                <Link to="/games/$id" params={{ id: g.year.toString() }} className="">
                  <img
                    src={g.imageUrl ?? "https://placehold.co/400"}
                    className="h-full w-full object-cover"
                  />
                </Link>
              </div>
            </CardContent>
            <CardHeader className="flex flex-col justify-start items-start w-full">
              <CardTitle className="flex flex-row items-start justify-between ">
                <div className="text-2xl font-bold">
                  {g.year}:{" "}
                  <span className="text-(--color-destructive) line-clamp-1">{g.name}</span>
                </div>
              </CardTitle>
              <CardDescription>
                <p>This game lorem ipsum</p>
                <p>
                  Learn more about the game{" "}
                  <span className="text-(--color-destructive)">
                    <a href={g.gameUrl ?? ""} target="_blank">
                      here
                    </a>
                  </span>
                  .
                </p>
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
