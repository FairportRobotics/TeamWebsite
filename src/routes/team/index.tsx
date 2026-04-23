import {
  PageDescription,
  PageHeader,
  PageTitle,
} from "@/components/page-header";
import type { UserSelect } from "@/db/schema";
import { getTeamMembersFn } from "@/lib/fn/user";
import { createFileRoute, Link } from "@tanstack/react-router";
import { MailIcon } from "lucide-react";

export const Route = createFileRoute("/team/")({
  component: RouteComponent,
  loader: async () => {
    const teamMembers = await getTeamMembersFn();
    return teamMembers;
  },
});

function RouteComponent() {
  const teamMembers = Route.useLoaderData();

  // TODO: Sort
  const students = teamMembers.filter((t) => t.role?.includes("student"));
  const moderators = teamMembers.filter((t) => t.role?.includes("mentor"));

  return (
    <div>
      <PageHeader>
        <PageTitle>
          The <span className="text-(--color-destructive)">team</span>
        </PageTitle>
        <PageDescription className="flex flex-col gap-2">
          <p>
            Get to know the coaches, mentors and students that make up our team.
            Learn about their roles on the team, their backgrounds and their
            contributions to our success.
          </p>
          <p>
            Inspiration for this page is{" "}
            <a
              href="https://1418.team/team"
              target="_blank"
              className="text-(--color-destructive)"
            >
              Team 1418
            </a>
            .
          </p>
        </PageDescription>
      </PageHeader>

      <TeamMemberSection teamMembers={students} label="Students" />
      <TeamMemberSection teamMembers={moderators} label="Mentors" />
    </div>
  );
}

function TeamMemberSection({
  teamMembers,
  label,
}: {
  teamMembers: UserSelect[];
  label: string;
}) {
  return (
    <div className="mt-8">
      <div className="flex flex-col gap-8 items-center justify-center">
        <h2 className="text-2xl text-white uppercase font-extrabold">
          {label}
        </h2>
        <div className="flex flex-row flex-wrap gap-8 items-center justify-center">
          {teamMembers.map((person) => (
            <PersonCard key={person.name} person={person} />
          ))}
        </div>
      </div>
    </div>
  );
}

// TODO: Link to individuals so we can show more details.
// TODO: Remove role and include position on the team.
function PersonCard({ person }: { person: UserSelect }) {
  return (
    <div className="flex flex-col items-center mb-4 bg-stone-700 w-80 p-4 rounded-lg">
      <Link to="/">
        <img src="https://placehold.co/300" className="rounded-md mb-2" />
      </Link>
      <div className="flex flex-row w-full items-start justify-between">
        <div>
          <h3 className="text-xl font-semibold text-white">{person.name} </h3>
          <p className="text-sm text-white/75">{person.role}</p>
        </div>
        <div className="bg-(--color-background) p-2 rounded-md hover:bg-(--color-destructive)">
          <a href={`mailto:${person.email}`} className="text-sm mt-2 lowercase">
            <MailIcon />
          </a>
        </div>
      </div>
    </div>
  );
}
