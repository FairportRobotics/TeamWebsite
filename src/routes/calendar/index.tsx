import { EventCalendar } from "@/components/event-calendar";
import { PageDescription, PageHeader, PageTitle } from "@/components/page-header";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/calendar/")({
  component: RouteComponent,
});

function RouteComponent() {
  const events = [
    { id: "1", title: "John's Birthday", date: "05/02/2026" },
    { id: "2", title: "Mentor Meeting at MD", date: "05/26/2026", time: "07:00PM" },
    { id: "3", title: "Canal Days", date: "06/06/2026", time: "07:00AM" },
    { id: "4", title: "Canal Days", date: "06/07/2026", time: "07:00AM" },
  ];

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

/*
export interface CalendarEvent {
  id: string;
  title: string;
  date: Date | string; // Accept both for flexibility
  time?: string;
}
*/
