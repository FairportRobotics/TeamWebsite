// prettier-ignore
import { BackTo } from "@/components/back-to";
import { PageDescription, PageHeader, PageTitle } from "@/components/page-header";
import { SectionHeader } from "@/components/section-header";
import { TeamActionButton } from "@/components/team-action-buttom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Permissions } from "@/lib/auth/permissions";
import { assertHasAnyPermissionFn } from "@/lib/auth/server";
import { getCalendarListForAdminFn, seedCalendarFn } from "@/lib/fn/calendar";
import { cn } from "@/lib/utils";
import { createFileRoute } from "@tanstack/react-router";
import { ChevronRight, SquareCheck } from "lucide-react";

export const Route = createFileRoute("/admin/calendar/")({
  beforeLoad: async () => {
    await assertHasAnyPermissionFn({
      data: { permissions: [Permissions.EventAdminister, Permissions.EventCreate] },
    });
  },
  loader: async () => {
    const calendar = await getCalendarListForAdminFn();
    return calendar;
  },
  component: RouteComponent,
});

function RouteComponent() {
  const calendar = Route.useLoaderData();

  const sorted = calendar.sort((a, b) =>
    b.startAt.toISOString().localeCompare(a.startAt.toISOString()),
  );

  async function handleSeedCalendar() {
    await seedCalendarFn();
    return { error: null };
  }

  return (
    <div>
      <BackTo to="/admin" label="Admin" />
      <PageHeader>
        <PageTitle>
          Event <span className="text-(--color-destructive)">Administration</span>
        </PageTitle>
        <PageDescription>Manage events and the calendar.</PageDescription>
      </PageHeader>

      <SectionHeader>Calendar</SectionHeader>
      <p>TODO: Add filtering by name of event, date range, status</p>
      <section className="flex flex-col gap-10 mt-12">
        {sorted.map((c) => (
          <Card key={c.id}>
            <CardHeader>
              <CardTitle className="text-3xl">{c.title}</CardTitle>
              <Separator className="my-4 p-1" />
              <CardDescription></CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-6">
                <CalendarSection title="Details">
                  <p>
                    When: {c.startAt.toLocaleString()} - {c.endAt.toLocaleString()}
                  </p>
                  <p>Where: {c.location}</p>
                </CalendarSection>

                <CalendarSection title="Description">
                  <div className="space-y-2">
                    {c.description?.map((d, i) => (
                      <p key={i}>{d}</p>
                    ))}
                  </div>
                </CalendarSection>

                <CalendarSection title="Who can see?">
                  <div className={cn("flex flex-col items-start grow gap-4", "text-muted")}>
                    <div className="flex items-start">
                      <div>
                        <SquareCheck
                          className={cn(
                            " w-8 h-8 mr-2 mt-0.5",
                            c.visibleTo === "all" ? "text-orange-500" : "",
                          )}
                        />
                      </div>
                      <span>All Visitors</span>
                    </div>
                    <div className="flex items-start">
                      <div>
                        <SquareCheck
                          className={cn(
                            " w-8 h-8 mr-2 mt-0.5",
                            c.visibleTo === "team_members" ? "text-orange-500" : "",
                          )}
                        />
                      </div>
                      <span>Team Members Only</span>
                    </div>
                    <div className="flex items-start">
                      <div>
                        <SquareCheck
                          className={cn(
                            " w-8 h-8 mr-2 mt-0.5",
                            c.visibleTo === "team_members_and_parents" ? "text-orange-500" : "",
                          )}
                        />
                      </div>
                      <span>Team Members and Parents Only</span>
                    </div>
                  </div>
                </CalendarSection>

                <CalendarSection title="Status">
                  <div className="flex flex-row items-center justify-between">
                    <span
                      className={
                        c.status === "draft" ? "text-orange-500 font-semibold" : "text-muted"
                      }
                    >
                      Draft
                    </span>
                    <ChevronRight />
                    <span
                      className={
                        c.status === "pending_review"
                          ? "text-orange-500 font-semibold"
                          : "text-muted"
                      }
                    >
                      Pending
                    </span>
                    <ChevronRight />
                    <span
                      className={
                        c.status === "published" ? "text-orange-500 font-semibold" : "text-muted"
                      }
                    >
                      Published
                    </span>
                    <ChevronRight />
                    <span
                      className={
                        c.status === "archived" ? "text-orange-500 font-semibold" : "text-muted"
                      }
                    >
                      Archived
                    </span>
                  </div>
                </CalendarSection>

                <CalendarSection title="Additional Information Link">
                  Show an icon that takes you to the external link which hopefully supplies more
                  information.
                </CalendarSection>

                <CalendarSection title="Sign Up Link">
                  [ SIGN UP LINK (X)]
                  {c.signupLink && (
                    <div className={cn("flex flex-col items-start grow gap-4", "text-muted")}>
                      <div className="flex items-start">
                        <div>
                          <SquareCheck
                            className={cn(
                              " w-8 h-8 mr-2 mt-0.5",
                              c.signupLinkVisibleTo === "all" ? "text-orange-500" : "",
                            )}
                          />
                        </div>
                        <span>All Visitors</span>
                      </div>
                      <div className="flex items-start">
                        <div>
                          <SquareCheck
                            className={cn(
                              " w-8 h-8 mr-2 mt-0.5",
                              c.signupLinkVisibleTo === "team_members" ? "text-orange-500" : "",
                            )}
                          />
                        </div>
                        <span>Team Members Only</span>
                      </div>
                      <div className="flex items-start">
                        <div>
                          <SquareCheck
                            className={cn(
                              " w-8 h-8 mr-2 mt-0.5",
                              c.signupLinkVisibleTo === "team_members_and_parents"
                                ? "text-orange-500"
                                : "",
                            )}
                          />
                        </div>
                        <span>Team Members and Parents Only</span>
                      </div>
                    </div>
                  )}
                </CalendarSection>

                <CalendarSection title="History">
                  List some high-level information about who has made edits and when. List date,
                  person and their final status.
                </CalendarSection>
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex flex-row gap-4 mt-8">
                <Button disabled={c.status !== "draft"}>Request Approval</Button>
                <Button disabled={c.status === "published"}>Publish</Button>
                <Button>Edit</Button>
                <Button disabled={c.status === "archived"}>Archive</Button>
                <Button variant="destructive">Delete</Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </section>

      <section>
        <pre>{JSON.stringify(calendar, null, 2)}</pre>
      </section>

      <TeamActionButton
        variant="destructive"
        className="mt-4"
        action={() => {
          return handleSeedCalendar();
        }}
      >
        Seed Calendar
      </TeamActionButton>
    </div>
  );
}

function CalendarSection({ title, children }: React.ComponentProps<"div">) {
  return (
    <div className="bg-slate-800 border-2 border-slate-600 rounded-lg p-4 pb-6">
      <h2 className="uppercase text-lg font-semibold text-white">{title}</h2>
      <Separator className="p-0.5 my-4" />
      <div className="mt-2">{children}</div>
    </div>
  );
}
