// prettier-ignore
import { BackTo } from "@/components/back-to";
import { PageDescription, PageHeader, PageTitle } from "@/components/page-header";
import { SectionHeader } from "@/components/section-header";
import { Button } from "@/components/ui/button";
import { Permissions } from "@/lib/auth/permissions";
import { assertHasAnyPermissionFn } from "@/lib/auth/server";
import { getEventsForAdminFn, type EventInsertProps } from "@/lib/fn/calendar";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/calendar/")({
  beforeLoad: async () => {
    await assertHasAnyPermissionFn({
      data: { permissions: [Permissions.EventAdminister, Permissions.EventCreate] },
    });
  },
  loader: async () => {
    const calendar = await getEventsForAdminFn();
    return calendar;
  },
  component: RouteComponent,
});

function RouteComponent() {
  const calendar = Route.useLoaderData();

  async function handleSeedEvents() {
    const calendarData: EventInsertProps[] = [
      {
        title: "Team Picnic",
        description: ["Let's get together and have some food."],
        visibleTo: "team_members_and_parents",
        signupLink: "https://www.fairportcanaldays.com/canal-days/",
        signupLinkVisibleTo: "team_members_and_parents",
        startAt: new Date(2026, 5, 17, 11, 0, 0),
        endAt: new Date(2026, 5, 17, 14, 0, 0),
      },
      {
        title: "Chicken BBQ",
        description: ["Our biggest fundraising event of the year!"],
        visibleTo: "team_members_and_parents",
        signupLink:
          "https://docs.google.com/document/d/1_PRVoHSkZooYqhKoe5y_CzNP81IDup8ZX0r8gNaCdyE/edit?tab=t.0",
        signupLinkVisibleTo: "team_members_and_parents",
        startAt: new Date(2026, 6, 18, 15, 0, 0),
        endAt: new Date(2026, 6, 18, 19, 30, 0),
      },
      {
        title: "Summer STEM - Session 1",
        description: ["Shape some minds"],
        visibleTo: "team_members_and_parents",
        signupLink: "https://docs.google.com/document/d/1ywDMMYkyJ2sHhaRnDX1E3wkYxrGx03Q8/edit",
        signupLinkVisibleTo: "team_members_and_parents",
        startAt: new Date(2026, 7, 15, 17, 30, 0),
        endAt: new Date(2026, 7, 15, 20, 0, 0),
      },
      {
        title: "Summer STEM - Session 2",
        description: ["Shape some minds"],
        visibleTo: "team_members_and_parents",
        signupLink: "https://docs.google.com/document/d/1ywDMMYkyJ2sHhaRnDX1E3wkYxrGx03Q8/edit",
        signupLinkVisibleTo: "team_members_and_parents",
        startAt: new Date(2026, 8, 11, 17, 30, 0),
        endAt: new Date(2026, 8, 11, 20, 0, 0),
      },
      {
        title: "FLL Info",
        description: ["Shape some minds"],
        visibleTo: "team_members_and_parents",
        signupLink: "https://docs.google.com/document/d/1ywDMMYkyJ2sHhaRnDX1E3wkYxrGx03Q8/edit",
        signupLinkVisibleTo: "team_members_and_parents",
        startAt: new Date(2026, 8, 26, 17, 30, 0),
        endAt: new Date(2026, 87, 26, 19, 45, 0),
      },
      {
        title: "Chicken BBQ",
        description: [
          "Stop by and visit us at the Fairport Canal Days for STEM fun and games.",
          "Let the kids play catch with one of our competition robots.",
          "Our booth with also have lots of inreresting bits and bobs so kids can make their very own Junk Bots.",
        ],
        visibleTo: "all",
        informationLink: "https://www.fairportcanaldays.com/canal-days/",
        startAt: new Date(2026, 6, 6, 8, 0, 0),
        endAt: new Date(2026, 6, 7, 17, 0, 0),
      },
    ];
    calendarData.forEach(async (d) => console.log(d.title));

    // const results = await createEventDraftFn({
    //   data: {
    //     title: "Chicken BBQ",
    //     description: [
    //       "Stop by and visit us at the Fairport Canal Days for STEM fun and games.",
    //       "Let the kids play catch with one of our competition robots.",
    //       "Our booth with also have lots of inreresting bits and bobs so kids can make their very own Junk Bots.",
    //     ],
    //     startAt: new Date(2026, 6, 6, 8, 0, 0),
    //     endAt: new Date(2026, 6, 7, 17, 0, 0),
    //     visibleTo: "all",
    //     informationLink: "https://www.fairportcanaldays.com/canal-days/",
    //     signupLink: undefined,
    //     signupLinkVisibleTo: undefined,
    //   },
    // });

    //eventData.forEach(async (d) => await createEventDraftFn({ data: d }));
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

      <SectionHeader>Published Events</SectionHeader>

      <SectionHeader>Ubpublished Events</SectionHeader>
      <section>
        <pre>{JSON.stringify(calendar, null, 2)}</pre>
      </section>

      <Button variant="destructive" onClick={handleSeedEvents}>
        Seed Events
      </Button>
    </div>
  );
}
