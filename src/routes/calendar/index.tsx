import { EventCalendar, type CalendarEvent } from "@/components/event-calendar";
import { PageDescription, PageHeader, PageTitle } from "@/components/page-header";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/calendar/")({
  component: RouteComponent,
});

function RouteComponent() {
  const events = [
    { id: "john-bday", title: "John's Birthday", date: "05/02/2026", visibility: "mentor" },
    {
      id: "mentor-meeting",
      title: "Mentor Meeting at MD",
      date: "05/26/2026",
      timeFrom: "06:00PM",
      timeThrough: "08:00PM",
      visibility: "all",
    },
    {
      id: "canal-days-1",
      title: "Canal Days",
      date: "06/06/2026",
      timeFrom: "07:00AM",
      timeThrough: "05:00PM",
      visibility: "all",
    },
    {
      id: "canal-days-2",
      title: "Canal Days",
      date: "06/07/2026",
      timeFrom: "07:00AM",
      timeThrough: "05:00PM",
      visibility: "all",
    },
    {
      id: "team-picnic",
      title: "Team Picnic",
      date: "05/17/2026",
      timeFrom: "11:00AM",
      timeThrough: "02:00PM",
      visibility: "team",
      signupLink: "https://www.signupgenius.com/go/10C0A4AA5A92BA2F4C43-63860749-team",
    },
  ] as CalendarEvent[];

  return (
    <div>
      <PageHeader>
        <PageTitle>
          Team <span className="text-(--color-destructive)">events</span>
        </PageTitle>
        <PageDescription>
          This is where we can display information about upcoming events
        </PageDescription>
      </PageHeader>

      {/* <EventCalendar date={new Date("05/01/2026")} events={["a", "b", "c"]} />
      <EventCalendar date={new Date("05/02/2026")} events={["a", "b", "c"]} />
      <EventCalendar date={new Date("05/03/2026")} events={["a", "b", "c"]} />
      <EventCalendar date={new Date("05/04/2026")} events={["a", "b", "c"]} /> */}
      <EventCalendar initialMonth={new Date()} events={events} />
    </div>
  );
}
