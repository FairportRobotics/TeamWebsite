import { PageDescription, PageHeader, PageTitle } from "@/components/page-header";
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
        <div className="bg-(--color-destructive) text-center m-10 p-4">
          <h2 className="text-white text-3xl font-extrabold uppercase">
            <Await promise={slowData} fallback={<>Students (Loading...)</>}>
              {(slowData) => <>Students ({slowData.length})</>}
            </Await>
          </h2>
        </div>

        <div className="flex flex-row flex-wrap gap-4 items-center justify-center">
          <Await
            promise={slowData}
            fallback={
              <>
                {[1, 2, 3].map((i) => (
                  <MemberCard key={i} userId={null} name={""} role={""} image={""} />
                ))}
              </>
            }
          >
            {(slowData) =>
              slowData
                .filter((t) => t.role?.includes("student"))
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((s) => (
                  <MemberCard
                    key={s.id}
                    userId={s.id}
                    name={s.name}
                    role={s.role}
                    image={s.image}
                  />
                ))
            }
          </Await>
        </div>
      </div>

      <div className="mb-20">
        <div className="bg-(--color-destructive) text-center m-10 p-4">
          <h2 className="text-white text-3xl font-extrabold uppercase">
            <Await promise={slowData} fallback={<>Mentors (Loading...)</>}>
              {(slowData) => <>Mentors ({slowData.length})</>}
            </Await>
          </h2>
        </div>

        <div className="flex flex-row flex-wrap gap-4 items-center justify-center">
          <Await
            promise={slowData}
            fallback={
              <>
                {[1, 2, 3].map((i) => (
                  <MemberCard key={i} userId={""} name={""} role={""} image={""} />
                ))}
              </>
            }
          >
            {(slowData) =>
              slowData
                .filter((t) => t.role?.includes("mentor"))
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((s) => (
                  <MemberCard
                    key={s.id}
                    userId={s.id}
                    name={s.name}
                    role={s.role}
                    image={s.image}
                  />
                ))
            }
          </Await>
        </div>
      </div>
    </div>
  );
}

function MemberCard({
  userId,
  name,
  role,
  image,
}: {
  userId?: string | null;
  name?: string | null;
  role?: string | null;
  image?: string | null;
}) {
  if (!userId) {
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
        <Link to="/team/$id" params={{ id: userId }} className="w-75 h-75">
          <img
            src={image ?? "https://placehold.co/300"}
            className="rounded-md mb-2 object-contain"
          />
        </Link>
      </CardContent>
      <CardHeader className="flex flex-col justify-start items-start w-full">
        <CardTitle className="">
          <div className="text-2xl font-bold">{name}</div>
          <span className="text-(--color-destructive)">{role}</span>
        </CardTitle>
        <CardDescription>Lorem ipsum...</CardDescription>
      </CardHeader>
    </Card>
  );
}
