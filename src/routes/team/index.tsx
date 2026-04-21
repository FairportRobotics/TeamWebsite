import {
  PageDescription,
  PageHeader,
  PageTitle,
} from "@/components/page-header";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/team/")({
  component: RouteComponent,
});

const coaches = [
  {
    name: "Marie Kraus",
    role: "Head Coach",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    email: "marie.kraus@fairportrobotics.org",
  },
  {
    name: "Terry Elie",
    role: "Assistant Coach",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    email: "terry.elie@fairportrobotics.org",
  },
];

const mentors = [
  {
    name: "Curt Moczarski",
    role: "Lead Mentor",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    email: "Curt.Moczarski@fairportrobotics.org",
  },
  {
    name: "John Hurrell",
    role: "Software Mentor",
    bio: "John has been a mentor since the end of the 2023 season. John works as a Senior Software Engineer at DxSelect.",
    email: "John.Hurrell@fairportrobotics.org",
  },
  {
    name: "Tyler Wilcox",
    role: "Software Mentor",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    email: "Tyler.Wilcox@fairportrobotics.org",
  },
  {
    name: "Fred Schoenfeld",
    role: "Software Mentor",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    email: "Fred.Schoenfeld@fairportrobotics.org",
  },
  {
    name: "Aaron Stuckey",
    role: "TBD",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    email: "Aaron.Stuckey@fairportrobotics.org",
  },
  {
    name: "Roger White",
    role: "TBD",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    email: "Roger.White@fairportrobotics.org",
  },
  {
    name: "Bill Voter",
    role: "TBD",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    email: "Bill.Voter@fairportrobotics.org",
  },
];

const students = [
  {
    name: "Autumn Schoenfeld",
    role: "Chief Engineer",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    email: "Autumn.Schoenfeld@fairportrobotics.org",
  },
  {
    name: "Maddie DeCicca",
    role: "CFT Lead",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    email: "Maddie.DeCicca@fairportrobotics.org",
  },
  {
    name: "Nicholas Munier",
    role: "Software Lead",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    email: "Nicholas.Munier@fairportrobotics.org",
  },
];

function RouteComponent() {
  return (
    <div>
      <PageHeader>
        <PageTitle>
          The <span className="text-(--color-destructive)">team</span>
        </PageTitle>
        <PageDescription>
          Get to know the coaches, mentors and students that make up our team.
          Learn about their roles on the team, their backgrounds and their
          contributions to our success.
        </PageDescription>
      </PageHeader>

      <div className="mt-8">
        <div className="flex flex-col gap-8 items-center justify-center">
          <h2 className="text-2xl text-white uppercase font-extrabold">
            Coaches
          </h2>
          <div className="grid grid-cols-3 gap-8 items-center justify-center">
            {coaches.map((person) => (
              <PersonCard key={person.name} person={person} />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8">
        <div className="flex flex-col gap-8 items-center justify-center">
          <h2 className="text-2xl text-white uppercase font-extrabold">
            Mentors
          </h2>
          <div className="grid grid-cols-3 gap-8 items-center justify-center">
            {mentors.map((person) => (
              <PersonCard key={person.name} person={person} />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8">
        <div className="flex flex-col gap-8 items-center justify-center">
          <h2 className="text-2xl text-white uppercase font-extrabold">
            Students
          </h2>
          <div className="grid grid-cols-3 gap-8 items-center justify-center">
            {students.map((person) => (
              <PersonCard key={person.name} person={person} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function PersonCard({ person }: { person: (typeof coaches)[0] }) {
  return (
    <div className="flex flex-col items-center mb-4 bg-stone-700 w-80 p-4 rounded-lg">
      <img src="https://i.pravatar.cc/300" className="rounded-md mb-2" />
      <h3 className="text-xl font-semibold text-white">{person.name}</h3>
      <p className="text-sm text-white/75">{person.role}</p>
      <p className="text-center line-clamp-2 mt-2">{person.bio}</p>
      <a
        href={`mailto:${person.email}`}
        className="text-blue-500 text-sm mt-2 lowercase"
      >
        {person.email}
      </a>
    </div>
  );
}
