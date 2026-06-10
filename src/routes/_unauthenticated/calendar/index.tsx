import { EventCalendar } from "@/components/site/EventCalendar";
import { PageDescription, PageHeader, PageTitle } from "@/components/site/PageHeader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getPublishedEventListFn } from "@/server/functions/calendar/getPublishedEventList";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/_unauthenticated/calendar/")({
  loader: async () => {
    const calendarEvents = await getPublishedEventListFn();
    return calendarEvents;
  },
  component: RouteComponent,
});

function RouteComponent() {
  const [mode, setMode] = useState<"calendar" | "list">("calendar");
  const calendarEvents = Route.useLoaderData();

  return (
    <div>
      <PageHeader>
        <PageTitle>
          Team <span className="text-destructive">calendar</span>
        </PageTitle>
        <PageDescription>
          Here's where you can find out what the team is up to. We'll display upcoming events and
          provide details about where we'll be and when.
        </PageDescription>
      </PageHeader>

      {mode === "calendar" ? (
        <div>
          <EventCalendar initialMonth={new Date()} events={calendarEvents} />
          <Button onClick={() => setMode("list")} className="mt-6">
            View as List
          </Button>
        </div>
      ) : (
        <div>
          <Card>
            <div className="w-full max-w-6xl mx-auto  rounded-xl shadow-sm border overflow-hidden">
              {calendarEvents.map((e, i) => (
                <div key={i}>
                  {e.startAt.toLocaleTimeString()} : {e.title}{" "}
                  {/* {!!e.location ? <div>at {e.location}</div> : <></>} */}
                </div>
              ))}
            </div>
          </Card>
          <Button onClick={() => setMode("calendar")} className="mt-6">
            View as Calendar
          </Button>
        </div>
      )}
    </div>
  );
}
