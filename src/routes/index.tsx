import { PageDescription, PageHeader, PageTitle } from "@/components/page-header";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: App,
  loader: async ({ context }) => {
    return context.data?.user || null;
  },
});

function App() {
  const user = Route.useLoaderData();
  return (
    <main className="">
      <PageHeader>
        <PageTitle>
          Team <span className="text-(--color-destructive)">578</span>
        </PageTitle>
        <PageDescription>
          <div>Welcome {user ? user.name : "Guest"}!</div>
          <p>Id: {user?.id}</p>
          <p>Email: {user?.email}</p>
          <p>Roles: {user?.role}</p>
        </PageDescription>
      </PageHeader>

      <section>
        <p>
          Inspiration for this site is{" "}
          <a href="https://1418.team/team" target="_blank" className="text-(--color-destructive)">
            Team 1418
          </a>
          .
        </p>
      </section>
    </main>
  );
}
