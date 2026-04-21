import {
  PageDescription,
  PageHeader,
  PageTitle,
} from "@/components/page-header";
import { getSessionFn } from "@/lib/server-functions";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  loader: async () => {
    const session = await getSessionFn();

    return {
      user: session?.user ?? undefined,
    };
  },
  component: App,
});

function App() {
  const { user } = Route.useLoaderData();

  return (
    <main className="">
      <PageHeader>
        <PageTitle>
          Team <span className="text-(--color-destructive)">578</span>
        </PageTitle>
        <PageDescription>
          <div>Welcome {user ? user.name : "Guest"}!</div>
          <div>Roles: {user?.role}</div>
        </PageDescription>
      </PageHeader>

      <section></section>
    </main>
  );
}
