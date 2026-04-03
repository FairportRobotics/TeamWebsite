import { authClient } from "@/lib/auth-client";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/")({
  component: RouteComponent,
  loader: async () => {
    // const results = await auth.api.listUsers();

    const { data, error } = await authClient.admin.listUsers({
      query: { sortBy: "name", sortDirection: "desc" },
    });

    if (error) {
      return [];
    }

    return data.users;
  },
});

function RouteComponent() {
  const users = Route.useLoaderData();
  return (
    <div>
      <h1>User Admimnistration</h1>
      <ul>
        {users.map((user, idx) => (
          <li key={idx}>
            User[{idx}]: {user.name} ({user.email}) - {user.role ?? "visitor"}{" "}
            {user.image && (
              <img
                src={user.image}
                alt={`${user.name}'s profile picture`}
                width={32}
                height={32}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
