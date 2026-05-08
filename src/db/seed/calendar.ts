/*
Canal Days, Chicken BBQ, Summer STEM Class Sign up Sheets
Canal Days June 6-7
Students: sign up for at least 2 shifts.
Mentors: we would love your help too for a shift or two!
https://docs.google.com/document/d/1zyqPueBU-cLDkouemeDWvjXCspJA4boGk3WCFClHgoc/edit?tab=t.0
 
 
Chicken BBQ Fundraiser June 18th
Students: sign up for at least 1 shift
https://docs.google.com/document/d/1_PRVoHSkZooYqhKoe5y_CzNP81IDup8ZX0r8gNaCdyE/edit?tab=t.0
 
 
Summer STEM Classes July 15, Aug. 11, Aug. 26
We need at least 6 students to run each of these classes, but the more the merrier!
https://docs.google.com/document/d/1ywDMMYkyJ2sHhaRnDX1E3wkYxrGx03Q8/edit
 

Picnic Sign Up
Our Team picnic will be on Sunday May 17th, 11-2pm (or later), at the VFW (300 Macedon Center Road).  Please have your parents sign up for a dish to pass and indicate the total number of people attending.  Bring some lawn games and/or board games to share!
 
https://www.signupgenius.com/go/10C0A4AA5A92BA2F4C43-63860749-team
Sign Me Up
SignUpGenius sign up form
 
*/

import type { CalendarWithDatesSelect } from "../schema";

export const seedCalendar = [
  {
    title: "Ra Cha Cha Ruckus",
    description: ["Let's get together and have some food."],
    location: "Nazareth University Golisano Training Center",
    visibleTo: ["everyone"],
    informationLink: "https://ruckus.penfieldrobotics.com/",
    signupLink: null,
    signupLinkVisibleTo: null,
    dates: [
      {
        startAt: new Date("2025-11-08:00:00"),
        endAt: new Date("2025-11-08T18:30:00"),
      },
    ],
  },
  {
    title: "Team Picnic",
    description: ["Let's get together and have some food."],
    location: "VA",
    visibleTo: ["students", "mentors", "parents"],
    informationLink: null,
    signupLink: "https://www.signupgenius.com/go/10C0A4AA5A92BA2F4C43-63860749-team",
    signupLinkVisibleTo: ["students", "mentors", "parents"],
    dates: [
      {
        startAt: new Date("2026-05-17T11:00:00"),
        endAt: new Date("2026-05-17T14:00:00"),
      },
    ],
  },
  {
    title: "Chicken BBQ",
    description: ["Our biggest fundraising event of the year!"],
    location: "Fairport Hight School",
    visibleTo: ["students", "mentors", "parents"],
    informationLink: null,
    signupLink:
      "https://docs.google.com/document/d/1_PRVoHSkZooYqhKoe5y_CzNP81IDup8ZX0r8gNaCdyE/edit?tab=t.0",
    signupLinkVisibleTo: ["students", "mentors", "parents"],
    dates: [
      {
        startAt: new Date("2026-06-18T15:00:00"),
        endAt: new Date("2026-06-18T19:30:00"),
      },
    ],
  },
  {
    title: "Summer STEM - Session 1",
    description: ["Shape some minds"],
    location: "Perinton Rec Center",
    visibleTo: ["students", "mentors", "parents"],
    informationLink: null,
    signupLink: "https://docs.google.com/document/d/1ywDMMYkyJ2sHhaRnDX1E3wkYxrGx03Q8/edit",
    signupLinkVisibleTo: ["students", "mentors", "parents"],
    dates: [
      {
        startAt: new Date("2026-07-15T17:30:00"),
        endAt: new Date("2026-07-15T20:00:00"),
      },
    ],
  },
  {
    title: "Summer STEM - Session 2",
    description: ["Shape some minds"],
    location: "Perinton Rec Center",
    visibleTo: ["students", "mentors", "parents"],
    informationLink: null,
    signupLink: "https://docs.google.com/document/d/1ywDMMYkyJ2sHhaRnDX1E3wkYxrGx03Q8/edit",
    signupLinkVisibleTo: ["students", "mentors", "parents"],
    dates: [
      {
        startAt: new Date("2026-08-11T17:30:00"),
        endAt: new Date("2026-08-11T20:00:00"),
      },
    ],
  },
  {
    title: "FLL Info",
    description: ["Shape some minds"],
    location: "Perinton Rec Center",
    visibleTo: ["students", "mentors", "parents"],
    informationLink: null,
    signupLink: "https://docs.google.com/document/d/1ywDMMYkyJ2sHhaRnDX1E3wkYxrGx03Q8/edit",
    signupLinkVisibleTo: ["students", "mentors", "parents"],
    dates: [
      {
        startAt: new Date("2026-08-16T17:30:00"),
        endAt: new Date("2026-08-16T19:45:00"),
      },
    ],
  },
  {
    title: "Canal Days",
    description: [
      "Stop by and visit us at the Fairport Canal Days for STEM fun and games.",
      "Let the kids play catch with one of our competition robots.",
      "Our booth with also have lots of inreresting bits and bobs so kids can make their very own Junk Bots.",
    ],
    location: "Fairport Village",
    visibleTo: ["everyone"],
    informationLink: "https://www.fairportcanaldays.com/canal-days/",
    dates: [
      {
        startAt: new Date("2026-06-06T08:00:00"),
        endAt: new Date("2026-06-06T17:00:00"),
      },
      {
        startAt: new Date("2026-06-07T08:00:00"),
        endAt: new Date("2026-06-07T17:00:00"),
      },
    ],
  },
  {
    title: "Mentor Meeting",
    description: [
      "Mentors - please join us for the end of the year review and discussion on plans for next year.",
    ],
    location: "Minerva Deland",
    visibleTo: ["mentors"],
    informationLink: "https://www.fairportcanaldays.com/canal-days/",
    signupLink: null,
    signupLinkVisibleTo: null,
    dates: [
      {
        startAt: new Date("2026-05-26T18:00:00"),
        endAt: new Date("2026-05-26T20:00:00"),
      },
    ],
  },
] as CalendarWithDatesSelect[];
