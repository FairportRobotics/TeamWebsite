import { PageDescription, PageHeader, PageTitle } from "@/components/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getTeamMembersFn } from "@/lib/fn/user";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/team/")({
  component: RouteComponent,
  loader: async () => {
    const teamMembers = await getTeamMembersFn();
    return teamMembers;
  },
});

function RouteComponent() {
  const teamMembers = Route.useLoaderData();

  const students = teamMembers
    .filter((t) => t.role?.includes("student"))
    .sort((a, b) => a.name.localeCompare(b.name));
  const mentors = teamMembers
    .filter((t) => t.role?.includes("mentor"))
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div>
      <PageHeader>
        <PageTitle>
          The <span className="text-(--color-destructive)">team</span>
        </PageTitle>
        <PageDescription className="flex flex-col gap-4">
          <p>
            Get to know the coaches, mentors and students that make up our team. Learn about their
            roles on the team, their backgrounds and their contributions to our success.
          </p>
        </PageDescription>
      </PageHeader>

      {/* Students */}
      <div className="mb-20">
        <div className="bg-(--color-destructive) text-center m-10 p-4">
          <h2 className="text-white text-3xl font-extrabold uppercase">
            Students ({students.length})
          </h2>
        </div>
        <div className="flex flex-row flex-wrap gap-4 items-center justify-center">
          {students.map((s) => (
            <Card key={s.id}>
              <CardContent>
                <Link to="/team/$id" params={{ id: s.id }}>
                  <img src="https://placehold.co/300" className="rounded-md mb-2" />
                </Link>
              </CardContent>
              <CardHeader className="flex flex-col justify-start items-start w-full">
                <CardTitle className="">
                  <div className="text-2xl font-bold">{s.name}</div>
                  <span className="text-(--color-destructive)">{s.role}</span>
                </CardTitle>
                <CardDescription>Lorem ipsum...</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>

      {/* Mentors */}
      <div>
        <div className="bg-(--color-destructive) text-center m-10 p-4">
          <h2 className="text-white text-3xl font-extrabold uppercase">
            Mentors ({mentors.length})
          </h2>
        </div>
        <div className="flex flex-row flex-wrap gap-4 items-center justify-center">
          {mentors.map((s) => (
            <Card key={s.id}>
              <CardContent>
                <Link to="/team/$id" params={{ id: s.id }}>
                  <img src="https://placehold.co/300" className="rounded-md mb-2" />
                </Link>
              </CardContent>
              <CardHeader className="flex flex-col justify-start items-start w-full">
                <CardTitle className="">
                  <div className="text-2xl font-bold">{s.name}</div>
                  <span className="text-(--color-destructive)">{s.role}</span>
                </CardTitle>
                <CardDescription>Lorem ipsum...</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
