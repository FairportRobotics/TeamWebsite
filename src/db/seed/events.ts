import type { CalendarEvent } from "@/components/event-calendar";

export const seedEvents = [
  {
    id: "team-picnic",
    title: "Team Picnic",
    date: "05/17/2026",
    timeFrom: "11:00 AM",
    timeThrough: "2:00 PM",
    visibility: "team",
    signupLink: "https://www.signupgenius.com/go/10C0A4AA5A92BA2F4C43-63860749-team",
  },
  {
    id: "canal-days-1",
    title: "Canal Days",
    date: "06/06/2026",
    timeFrom: "7:00 AM",
    timeThrough: "5:00 PM",
    visibility: "all",
    signupLink:
      "https://docs.google.com/document/d/1zyqPueBU-cLDkouemeDWvjXCspJA4boGk3WCFClHgoc/edit?tab=t.0",
  },
  {
    id: "canal-days-2",
    title: "Canal Days",
    date: "06/07/2026",
    timeFrom: "7:00A M",
    timeThrough: "5:00 PM",
    visibility: "all",
    signupLink:
      "https://docs.google.com/document/d/1zyqPueBU-cLDkouemeDWvjXCspJA4boGk3WCFClHgoc/edit?tab=t.0",
  },
  {
    id: "chicken-bbq",
    title: "Chicken BBQ",
    date: "06/18/2026",
    timeFrom: "3:00 PM",
    timeThrough: "7:30 PM",
    visibility: "all",
    signupLink:
      "https://docs.google.com/document/d/1_PRVoHSkZooYqhKoe5y_CzNP81IDup8ZX0r8gNaCdyE/edit?tab=t.0",
  },
  {
    id: "stem-07",
    title: "Summer STEM",
    date: "07/15/2026",
    timeFrom: "5:30 PM",
    timeThrough: "8:00 PM",
    visibility: "all",
    signupLink: "https://docs.google.com/document/d/1ywDMMYkyJ2sHhaRnDX1E3wkYxrGx03Q8/edit",
  },
  {
    id: "stem-08",
    title: "Summer STEM",
    date: "08/11/2026",
    timeFrom: "5:30 PM",
    timeThrough: "8:00 PM",
    visibility: "all",
    signupLink: "https://docs.google.com/document/d/1ywDMMYkyJ2sHhaRnDX1E3wkYxrGx03Q8/edit",
  },
  {
    id: "fll-info",
    title: "FLL Info",
    location: "Perinton Rec Center",
    date: "08/26/2026",
    timeFrom: "5:30 PM",
    timeThrough: "7:45 PM",
    visibility: "all",
    signupLink: "https://docs.google.com/document/d/1ywDMMYkyJ2sHhaRnDX1E3wkYxrGx03Q8/edit",
  },
] as CalendarEvent[];
