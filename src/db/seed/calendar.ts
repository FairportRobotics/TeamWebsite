import type { CalendarInsertItem } from "../schema";

export const seedCalendar = [
  {
    title: "Team Picnic",
    description: ["Let's get together and have some food."],
    visibleTo: "team_members_and_parents",
    signupLink: "https://www.fairportcanaldays.com/canal-days/",
    signupLinkVisibleTo: "team_members_and_parents",
    // startAt: new Date(2026, 5, 17, 11, 0, 0),
    // endAt: new Date(2026, 5, 17, 14, 0, 0),

    startAt: new Date("2026-05-17T11:00:00Z"),
    endAt: new Date("2026-05-17T14:00:00Z"),
  },
  {
    title: "Chicken BBQ",
    description: ["Our biggest fundraising event of the year!"],
    visibleTo: "team_members_and_parents",
    signupLink:
      "https://docs.google.com/document/d/1_PRVoHSkZooYqhKoe5y_CzNP81IDup8ZX0r8gNaCdyE/edit?tab=t.0",
    signupLinkVisibleTo: "team_members_and_parents",
    startAt: new Date("2026-06-18T15:00:00Z"),
    endAt: new Date("2026-06-18T19:30:00Z"),
  },
  {
    title: "Summer STEM - Session 1",
    description: ["Shape some minds"],
    visibleTo: "team_members_and_parents",
    signupLink: "https://docs.google.com/document/d/1ywDMMYkyJ2sHhaRnDX1E3wkYxrGx03Q8/edit",
    signupLinkVisibleTo: "team_members_and_parents",
    startAt: new Date("2026-07-15T17:30:00Z"),
    endAt: new Date("2026-07-15T20:00:00Z"),
  },
  {
    title: "Summer STEM - Session 2",
    description: ["Shape some minds"],
    visibleTo: "team_members_and_parents",
    signupLink: "https://docs.google.com/document/d/1ywDMMYkyJ2sHhaRnDX1E3wkYxrGx03Q8/edit",
    signupLinkVisibleTo: "team_members_and_parents",
    startAt: new Date("2026-08-11T17:30:00Z"),
    endAt: new Date("2026-08-11T20:00:00Z"),
  },
  {
    title: "FLL Info",
    description: ["Shape some minds"],
    visibleTo: "team_members_and_parents",
    signupLink: "https://docs.google.com/document/d/1ywDMMYkyJ2sHhaRnDX1E3wkYxrGx03Q8/edit",
    signupLinkVisibleTo: "team_members_and_parents",
    startAt: new Date("2026-08-16T17:30:00Z"),
    endAt: new Date("2026-08-16T19:45:00Z"),
  },
  {
    title: "Canal Days - Day 1",
    description: [
      "Stop by and visit us at the Fairport Canal Days for STEM fun and games.",
      "Let the kids play catch with one of our competition robots.",
      "Our booth with also have lots of inreresting bits and bobs so kids can make their very own Junk Bots.",
    ],
    visibleTo: "all",
    informationLink: "https://www.fairportcanaldays.com/canal-days/",
    startAt: new Date("2026-06-06T08:00:00Z"),
    endAt: new Date("2026-08-17T17:00:00Z"),
  },
] as CalendarInsertItem[];
