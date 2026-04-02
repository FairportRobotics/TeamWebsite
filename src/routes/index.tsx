import { getSessionFn } from "@/lib/server-functions";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: App,
  loader: async () => {
    const session = await getSessionFn();

    return {
      user: session?.user ?? undefined,
    };
  },
});

function App() {
  const { user } = Route.useLoaderData();
  return (
    <main className="">
      <section>
        Welcome {user ? user.name : "Guest"}! This is the home page.
      </section>
    </main>
  );
}
