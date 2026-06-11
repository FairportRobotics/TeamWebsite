import { EventCalendar } from "@/components/site/EventCalendar";
import { PageDescription, PageHeader, PageTitle } from "@/components/site/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getPublishedEventListFn } from "@/server/functions/calendar/getPublishedEventList";
import { createFileRoute } from "@tanstack/react-router";
import { format } from "date-fns";
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

  const upComing = calendarEvents
    .filter((a) => a.startAt >= new Date())
    .sort((a, b) => a.startAt.toISOString().localeCompare(b.endAt.toISOString()));

  return (
    <div>
      <PageHeader>
        <PageTitle>
          Team <span className="text-destructive">calendar</span>
        </PageTitle>
        <PageDescription>
          Here's where you can find out what the team is up to. We'll display upcoming events and provide details about
          where we'll be and when.
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
          {upComing.map((e, i) => (
            <Card key={`${e.id}.${i}`}>
              <CardHeader>
                <CardTitle>{e.title}</CardTitle>
                <CardDescription>
                  @ {e.location} from {format(e.startAt, "M/dd/yyyy h:mmaaa")} to {format(e.endAt, "h:mmaaa")}
                </CardDescription>
                <CardContent>{e.description}</CardContent>
              </CardHeader>
            </Card>
          ))}

          <Button onClick={() => setMode("calendar")} className="mt-6">
            View as Calendar
          </Button>
        </div>
      )}
    </div>
  );
}
