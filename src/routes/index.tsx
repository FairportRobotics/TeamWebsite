import {
  PageDescription,
  PageHeader,
  PageTitle,
} from "@/components/page-header";
import { getSessionFn } from "@/lib/auth/server";
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
      <PageHeader>
        <PageTitle>
          Team <span className="text-(--color-destructive)">578</span>
        </PageTitle>
        <PageDescription>Welcome {user ? user.name : "Guest"}!</PageDescription>
      </PageHeader>

      <section></section>
    </main>
  );
}
