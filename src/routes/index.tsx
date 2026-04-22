import {
  PageDescription,
  PageHeader,
  PageTitle,
} from "@/components/page-header";
import { createFileRoute, useRouteContext } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: App,
  loader: async ({ context }) => {
    console.log("loader context:", context);
    return { user: context.session?.user };
  },
});

function App() {
  const { session } = useRouteContext({ from: "__root__" });
  console.log("useRouteContext session", session);

  const whatever = Route.useLoaderData();
  console.log("useRouteContext whatever", whatever);

  return (
    <main className="">
      <PageHeader>
        <PageTitle>
          Team <span className="text-(--color-destructive)">578</span>
        </PageTitle>
        <PageDescription>{session?.user.name}</PageDescription>
      </PageHeader>

      <section></section>
    </main>
  );
}
