import {
  PageDescription,
  PageHeader,
  PageTitle,
} from "@/components/page-header";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: App,
  loader: async ({ context }) => {
    return context.user;
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
          <div>Roles: {user?.role}</div>
        </PageDescription>
      </PageHeader>

      <section></section>
    </main>
  );
}
