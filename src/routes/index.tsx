import {
  PageDescription,
  PageHeader,
  PageTitle,
} from "@/components/page-header";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: App,
  loader: async ({ context }) => {
    const user = context.data?.user;
    return user || null;
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
          <p>{user?.id}</p>
          <p>{user?.email}</p>
          <p>{user?.role}</p>
        </PageDescription>
      </PageHeader>

      <section></section>
    </main>
  );
}
