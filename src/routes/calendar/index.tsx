import { EventCalendar } from "@/components/event-calendar";
import { PageDescription, PageHeader, PageTitle } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { getCalendarListFn } from "@/lib/fn/calendar";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/calendar/")({
  component: RouteComponent,
  loader: async () => {
    const calendarEvents = await getCalendarListFn();
    return calendarEvents;
  },
});

function RouteComponent() {
  const [mode, setMode] = useState<"calendar" | "list">("calendar");
  const calendarEvents = Route.useLoaderData();

  return (
    <div>
      <PageHeader>
        <PageTitle>
          Team <span className="text-(--color-destructive)">calendar</span>
        </PageTitle>
        <PageDescription>
          Here's where you can find out what the team is up to. We'll display upcoming events and
          provide details about where we'll be and when.
        </PageDescription>
      </PageHeader>

      {mode === "calendar" ? (
        <div>
          <Button onClick={() => setMode("list")}>View as List</Button>
          <EventCalendar initialMonth={new Date()} events={calendarEvents} />
        </div>
      ) : (
        <div>
          <Button onClick={() => setMode("calendar")}>View as Calendar</Button>
          <div className="w-full max-w-6xl mx-auto  rounded-xl shadow-sm border overflow-hidden">
            {calendarEvents.map((e, i) => (
              <div key={i}>
                {e.startAt.toLocaleTimeString()} : {e.title}{" "}
                {/* {!!e.location ? <div>at {e.location}</div> : <></>} */}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
