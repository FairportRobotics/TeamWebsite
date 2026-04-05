import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/games/")({
  component: RouteComponent,
});

function RouteComponent() {
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
    </div>
  );
}
