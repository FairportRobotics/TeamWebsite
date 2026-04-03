import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/")({
  component: RouteComponent,
  loader: async () => {
    return [];
  },
});

function RouteComponent() {
  const users = Route.useLoaderData();
  return (
    <div>
      <h1>User Admimnistration</h1>
      <ul>
        {users.map((user, idx) => (
          <li key={idx}>User[{idx}]</li>
        ))}
      </ul>
    </div>
  );
}
