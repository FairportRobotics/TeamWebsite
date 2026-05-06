import { EventCalendar } from "@/components/event-calendar";
import { PageDescription, PageHeader, PageTitle } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { seedCalendar } from "@/db/seed/calendar";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/calendar/")({
  component: RouteComponent,
  loader: () => {
    return seedCalendar;
  },
});

function RouteComponent() {
  const [mode, setMode] = useState<"calendar" | "list">("calendar");
  const seedEvents = Route.useLoaderData();

  return (
    <div>
      <PageHeader>
        <PageTitle>
          Team <span className="text-(--color-destructive)">events</span>
        </PageTitle>
        <PageDescription>
          Here's where you can find out what the team is up to. We'll display upcoming events and
          provide details about where we'll be and when.
        </PageDescription>
      </PageHeader>

      {mode === "calendar" ? (
        <div>
          <Button onClick={() => setMode("list")}>View as List</Button>
          <EventCalendar initialMonth={new Date()} events={seedEvents} />
        </div>
      ) : (
        <div>
          <Button onClick={() => setMode("calendar")}>View as Calendar</Button>
          <div className="w-full max-w-6xl mx-auto  rounded-xl shadow-sm border overflow-hidden">
            {seedEvents.map((e, i) => (
              <div key={i}>
                {e.date.toLocaleString()} : {e.title}{" "}
                {!!e.location ? <div>at {e.location}</div> : <></>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
