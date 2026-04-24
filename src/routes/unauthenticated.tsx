import { PageDescription, PageHeader, PageTitle } from "@/components/page-header";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/unauthenticated")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <PageHeader>
        <PageTitle>
          On <span className="text-(--color-destructive)">no</span>
        </PageTitle>
        <PageDescription className="flex flex-col gap-4">
          <p>
            It looks like you tried to access an area that requires authentication but you're not
            signed in. Fortunately, that's an easy fix!
          </p>
          <p>
            Just navigate to the{" "}
            <Link to="/auth/signin" className="text-(--color-destructive)">
              Sign In
            </Link>{" "}
            page and continue from there.
          </p>
        </PageDescription>
      </PageHeader>
    </div>
  );
}
