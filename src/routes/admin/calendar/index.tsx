// prettier-ignore
import { BackTo } from "@/components/back-to";
import { PageDescription, PageHeader, PageTitle } from "@/components/page-header";
import { SectionHeader } from "@/components/section-header";
import { TeamActionButton } from "@/components/team-action-buttom";
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
import {
  approveCalendarFn,
  archiveCalendarFn,
  getCalendarListForAdminFn,
  requestApprovalCalendarFn,
  seedCalendarFn,
} from "@/lib/fn/calendar";
import { cn } from "@/lib/utils";
import { createFileRoute, useRouter } from "@tanstack/react-router";
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
  const router = useRouter();

  const sorted = calendar.sort((a, b) =>
    b.startAt.toISOString().localeCompare(a.startAt.toISOString()),
  );

  async function handleSeedCalendar() {
    await seedCalendarFn();
    router.invalidate();
    return { error: null };
  }

  async function handleRequestApproval(id: string) {
    console.log("handleRequestApproval", id);
    await requestApprovalCalendarFn({ data: { id } });
    router.invalidate();
    return { error: null };
  }

  async function handleApprove(id: string) {
    console.log("handleApprove", id);
    await approveCalendarFn({ data: { id } });
    router.invalidate();
    return { error: null };
  }

  async function handleArchive(id: string) {
    console.log("handleArchive", id);
    await archiveCalendarFn({ data: { id } });
    router.invalidate();
    return { error: null };
  }

  return (
    <div>
      <BackTo to="/admin" label="Back to Admin" />
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
              <div className="grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-6 mb-10">
                <CalendarSection title="Details">
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-col">
                      <span className="text-muted text-sm">From</span>
                      <span>{c.startAt.toLocaleString()}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-muted text-sm">Through</span>
                      <span>{c.endAt.toLocaleString()}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-muted text-sm">Location</span>
                      <span>{c.location}</span>
                    </div>
                  </div>
                </CalendarSection>

                <CalendarSection title="History">
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-col">
                      <div className="text-muted">Created</div>
                      <div className="">
                        <span className="text-muted text-sm mr-2">by</span>
                        <span>{c.createdByName}</span>
                      </div>
                      <div>
                        <span className="text-muted text-sm mr-2">at</span>
                        <span>{c.createdAt.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <div className="text-muted">Updated</div>
                      <div className="">
                        <span className="text-muted text-sm mr-2">by</span>
                        <span>{c.updatedByName}</span>
                      </div>
                      <div>
                        <span className="text-muted text-sm mr-2">at</span>
                        <span>{c.updatedAt.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </CalendarSection>

                <CalendarSection title="Description">
                  <div className="space-y-2">
                    {c.description?.map((d, i) => (
                      <p key={i}>{d}</p>
                    ))}
                  </div>
                </CalendarSection>

                <CalendarSection title="Who can see calendar entry?">
                  <div className={cn("flex flex-col items-start grow gap-4", "text-muted")}>
                    <div className="flex items-start">
                      <div>
                        <SquareCheck
                          className={cn(
                            " w-8 h-8 mr-2 mt-0.5",
                            c.visibleTo?.includes("everyone") ? "text-orange-500" : "",
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
                            c.visibleTo?.includes("students") ? "text-orange-500" : "",
                          )}
                        />
                      </div>
                      <span>Students</span>
                    </div>
                    <div className="flex items-start">
                      <div>
                        <SquareCheck
                          className={cn(
                            " w-8 h-8 mr-2 mt-0.5",
                            c.visibleTo?.includes("mentors") ? "text-orange-500" : "",
                          )}
                        />
                      </div>
                      <span>Mentors</span>
                    </div>
                    <div className="flex items-start">
                      <div>
                        <SquareCheck
                          className={cn(
                            " w-8 h-8 mr-2 mt-0.5",
                            c.visibleTo?.includes("parents") ? "text-orange-500" : "",
                          )}
                        />
                      </div>
                      <span>Parents</span>
                    </div>
                  </div>
                </CalendarSection>

                <CalendarSection title="Sign up link">
                  [ SIGN UP LINK (X)]
                  {c.signupLink && (
                    <div className={cn("flex flex-col items-start grow gap-4", "text-muted")}>
                      <div className="flex items-start">
                        <div>
                          <SquareCheck
                            className={cn(
                              " w-8 h-8 mr-2 mt-0.5",
                              c.signupLinkVisibleTo?.includes("everyone") ? "text-orange-500" : "",
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
                              c.signupLinkVisibleTo?.includes("students") ? "text-orange-500" : "",
                            )}
                          />
                        </div>
                        <span>Students</span>
                      </div>
                      <div className="flex items-start">
                        <div>
                          <SquareCheck
                            className={cn(
                              " w-8 h-8 mr-2 mt-0.5",
                              c.signupLinkVisibleTo?.includes("mentors") ? "text-orange-500" : "",
                            )}
                          />
                        </div>
                        <span>Mentors</span>
                      </div>
                      <div className="flex items-start">
                        <div>
                          <SquareCheck
                            className={cn(
                              " w-8 h-8 mr-2 mt-0.5",
                              c.signupLinkVisibleTo?.includes("parents") ? "text-orange-500" : "",
                            )}
                          />
                        </div>
                        <span>Parents</span>
                      </div>
                    </div>
                  )}
                </CalendarSection>

                <CalendarSection title="Status">
                  <div className="flex flex-row items-center">
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
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex flex-row gap-4 mt-8">
                <TeamActionButton
                  disabled={c.status !== "draft"}
                  action={() => {
                    return handleRequestApproval(c.id);
                  }}
                >
                  Request Approval
                </TeamActionButton>
                <TeamActionButton
                  disabled={c.status === "published"}
                  action={() => {
                    return handleApprove(c.id);
                  }}
                >
                  Publish
                </TeamActionButton>
                <TeamActionButton
                  variant="destructive"
                  action={() => {
                    return handleArchive(c.id);
                  }}
                >
                  Archive
                </TeamActionButton>
              </div>
            </CardFooter>
          </Card>
        ))}
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
