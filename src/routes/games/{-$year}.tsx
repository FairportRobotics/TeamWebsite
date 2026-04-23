import {
  PageDescription,
  PageHeader,
  PageTitle,
} from "@/components/page-header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getGameYearFn, getGameYearsExtentsFn } from "@/lib/fn/games";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/games/{-$year}")({
  component: RouteComponent,
  loader: async ({ params }) => {
    // Default to the current year,
    let gameYear = new Date().getFullYear();

    // If the current year's game has not yet be created, default to the most recent year.
    const { minYear, maxYear } = await getGameYearsExtentsFn();
    gameYear = maxYear ?? gameYear;

    // If params were provided, parse and assign to the game year as long as it falls
    // within the bounds of the years we have loaded.
    if (params.year) {
      const paramsYear = parseInt(params.year);

      if (paramsYear) {
        if (
          minYear &&
          maxYear &&
          paramsYear >= minYear &&
          paramsYear <= maxYear
        ) {
          gameYear = paramsYear;
        }
      }
    }

    // Get the game for the year.
    const game = await getGameYearFn({
      data: {
        year: gameYear,
      },
    });

    return { game, minYear, maxYear };
  },
});

function RouteComponent() {
  const { game, minYear, maxYear } = Route.useLoaderData();

  function handleSeedGames() {
    console.log("🌱 Seeding games...");
  }

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

      <Card className="mt-8" key={game.year}>
        <CardHeader>
          <CardTitle className="flex flex-row items-start justify-between ">
            <div className="text-2xl font-bold">
              {game.year}:{" "}
              <span className="text-(--color-destructive)">{game.name}</span>
            </div>
          </CardTitle>
          <CardDescription>
            <p>This game lorem ipsum</p>
            <p>
              Learn more about the game{" "}
              <span className="text-(--color-destructive)">
                <a href={game.gameUrl ?? ""} target="_blank">
                  here
                </a>
              </span>
              .
            </p>
          </CardDescription>
        </CardHeader>
        <CardContent></CardContent>
      </Card>
      <Button className="mt-6" variant="destructive" onClick={handleSeedGames}>
        Seed Games
      </Button>
    </div>
  );
}
