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
    <div>
      <h1>Hello from "/games/"!</h1>
      <p>
        This is where we can list each game year and include the robot name and
        any other awards or accolades we achieved.
      </p>
      <ul className="list-disc">
        <li>Display games, descending by year.</li>
        <li>
          For each year, provide information about the Robot, events it attended
          and any awards it won.
        </li>
        <li>For each year, list any awards or accolades we want to share.</li>
        <li>For each year, list any milestones the team wants to share.</li>
        <li>
          For each year, list any events we hosted or attended for that game
          year.
        </li>
      </ul>
      {years.map((game) => (
        <div key={game.year} className="my-4 rounded border p-4">
          <div className="flex flex-row items-start justify-between">
            <h2 className="text-xl font-bold">
              {game.year}: {game.name}
            </h2>
            <div className="bg-gray-200 p-4 rounded-3xl">
              {game.image && (
                <img
                  src={game.image}
                  alt={`${game.name!} image`}
                  className="h-50 my-2 max-w-xs"
                />
              )}
            </div>
          </div>

          <p>Hello</p>
        </div>
      ))}
    </div>
  );
}
