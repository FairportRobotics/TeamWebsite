import { PageDescription, PageHeader, PageTitle } from "@/components/page-header";
import { SectionHeader } from "@/components/section-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getTeamMembersFn } from "@/lib/fn/user";
import { Await, createFileRoute, defer, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/team/")({
  component: RouteComponent,
  loader: async () => {
    const teamMembersPromise = defer(getTeamMembersFn());
    return {
      slowData: teamMembersPromise,
    };
  },
});

function RouteComponent() {
  const { slowData } = Route.useLoaderData();

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

      <div className="mb-20">
        <SectionHeader>
          <Await promise={slowData} fallback={<>Students (Loading...)</>}>
            {(slowData) => <>Students ({slowData.length})</>}
          </Await>
        </SectionHeader>

        <div className="flex flex-row flex-wrap gap-4 items-center justify-center">
          <Await
            promise={slowData}
            fallback={
              <>
                {[1, 2, 3].map((i) => (
                  <MemberCard key={i} isPending={true} />
                ))}
              </>
            }
          >
            {(slowData) =>
              slowData
                .filter((t) => t.role?.includes("student"))
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((s) => <MemberCard key={s.id} isPending={false} {...s} />)
            }
          </Await>
        </div>
      </div>

      <div className="mb-20">
        <SectionHeader>
          <Await promise={slowData} fallback={<>Mentors (Loading...)</>}>
            {(slowData) => <>Mentors ({slowData.length})</>}
          </Await>
        </SectionHeader>

        <div className="flex flex-row flex-wrap gap-4 items-center justify-center">
          <Await
            promise={slowData}
            fallback={
              <>
                {[1, 2, 3].map((i) => (
                  <MemberCard key={i} isPending={true} />
                ))}
              </>
            }
          >
            {(slowData) =>
              slowData
                .filter((t) => t.role?.includes("mentor"))
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((s) => <MemberCard key={s.id} isPending={false} {...s} />)
            }
          </Await>
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
              src={image ?? "https://placehold.co/300x300"}
              alt={name ?? "Team Member Image"}
              className="w-full h-full object-cover rounded-md"
            />
          </Link>
        </div>
      </CardContent>
      <CardHeader className="flex flex-col justify-start items-start w-full">
        <CardTitle className="">
          <div className="text-2xl font-bold">{name}</div>
          <span className="text-(--color-destructive) uppercase">{role}</span>
        </CardTitle>
        <CardDescription>Lorem ipsum...</CardDescription>
      </CardHeader>
    </Card>
  );
}
