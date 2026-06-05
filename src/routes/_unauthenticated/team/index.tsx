import { PageDescription, PageHeader, PageTitle } from "@/components/site/PageHeader";
import { PageSectionContainer } from "@/components/site/PageSectionContainer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getTeamMembersFn } from "@/server/functions/user/getTeamMembers";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/_unauthenticated/team/")({
  loader: async () => {
    const teamMembers = getTeamMembersFn();
    return teamMembers;
  },
  component: RouteComponent,
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
          The <span className="text-destructive">team</span>
        </PageTitle>
        <PageDescription className="flex flex-col gap-4">
          <p>
            Get to know the coaches, mentors and students that make up our team. Learn about their
            roles on the team, their backgrounds and their contributions to our success.
          </p>
        </PageDescription>
      </PageHeader>

      <div className="flex flex-col gap-6">
        <PageSectionContainer
          title="Students"
          subTitle={`(${students.length} records)`}
          initialState="expanded"
        >
          <div className="flex flex-row flex-wrap gap-4 items-center justify-center">
            {students.map((m, i) => (
              <MemberCard key={i} isPending={false} {...m} />
            ))}
          </div>
        </PageSectionContainer>

        <div className="mb-20">
          <PageSectionContainer
            title="Mentors"
            subTitle={`(${mentors.length} records)`}
            initialState="expanded"
          >
            <div className="flex flex-row flex-wrap gap-4 items-center justify-center">
              {mentors.map((m, i) => (
                <MemberCard key={i} isPending={false} {...m} />
              ))}
            </div>
          </PageSectionContainer>
        </div>
      </div>
    </div>
  );
}

interface MemberCardProps {
  isPending: boolean;
  id?: string | null;
  name?: string | null;
  role?: string | null;
  image?: string | null;
  className?: string;
}

function MemberCard({ isPending, id, name, role, image }: MemberCardProps) {
  if (isPending) {
    return (
      <Card>
        <CardContent>
          <Skeleton className="w-75 h-75 rounded-md" />
        </CardContent>
        <CardHeader className="flex flex-col justify-start items-start w-full">
          <CardTitle className="mt-2">
            <Skeleton className="h-8 w-32 mb-2" />
            <Skeleton className="h-4 w-24" />
          </CardTitle>
          <CardDescription>
            <Skeleton className="h-4 w-full" />
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent>
        <div className="w-75 h-75 overflow-hidden flex items-center justify-center">
          <Link to="/team/$id" params={{ id: id! }}>
            <img
              src={image ?? "person-placeholder.png"}
              alt={name ?? "Team Member Image"}
              className="w-full h-full object-cover rounded-md"
            />
          </Link>
        </div>
      </CardContent>
      <CardHeader className="flex flex-col justify-start items-start w-full">
        <CardTitle className="">
          <div className="text-2xl font-bold">{name}</div>
          <span className="text-destructive uppercase">{role}</span>
        </CardTitle>
        <CardDescription>Lorem ipsum...</CardDescription>
      </CardHeader>
    </Card>
  );
}
