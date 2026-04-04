import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/robots/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h1>Hello from "/robots/"!</h1>
      <p>This is where we can list all our robots.</p>
      <ul className="list-disc">
        <li>Display robots, descending by game year.</li>
        <li>
          For each Robot, provide the year, name of the game and name of the
          robot.
        </li>
        <li>
          Coach, Mentor Roles: Provide a means of editing the list of Robots.
        </li>
      </ul>
    </div>
  );
}
