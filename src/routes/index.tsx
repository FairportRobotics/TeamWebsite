import { getSessionFn } from "@/lib/server-functions";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: App,
  loader: async () => {
    const session = await getSessionFn();
    console.log("Root Session:", session);

    return {
      user: session?.user ?? undefined,
    };
  },
});

function App() {
  const whatever = Route.useLoaderData();
  return (
    <main className="">
      <section>
        Welcome {whatever.user ? whatever.user.email : "Guest"}! This is the
        home page.
      </section>
    </main>
  );
}
