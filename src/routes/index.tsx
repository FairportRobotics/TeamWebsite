import { PageDescription, PageHeader, PageTitle } from "@/components/page-header";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: App,
  loader: async ({ context }) => {
    return context.session?.user ?? null;
  },
});

function App() {
  const user = Route.useLoaderData();
  return (
    <main className="">
      <PageHeader>
        <PageTitle>
          Fairport Robotics <span className="text-(--color-destructive)">Team 578</span>
        </PageTitle>
        <PageDescription>
          <div>Welcome {user ? user.name : "Guest"}!</div>
        </PageDescription>
      </PageHeader>

      <section>
        <p>
          Some of the look and feel of this site has been shamelessly stolen from the amazing{" "}
          <a href="https://1418.team/team" target="_blank" className="text-(--color-destructive)">
            Team 1418
          </a>
          .
        </p>
        <p>
          Trying to replace{" "}
          <a
            href="https://fairportrobotics.org/prod/wp/"
            target="_blank"
            className="text-(--color-destructive)"
          >
            the legacy team website.
          </a>
        </p>
      </section>
    </main>
  );
}
