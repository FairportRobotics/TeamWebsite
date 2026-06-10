import { NewEventPage } from "@/features/admin/event/new/new-event-page";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/admin/calendar/new")({
  component: NewEventPage,
});

// function RouteComponent() {
//   const router = useRouter();

//   async function handleSubmit(value: CalendarFormValues) {
//     await createEventFn({
//       data: {
//         title: value.title,
//         description: value.description,
//         location: value.location,
//         visibleTo: value.visibleTo as VisibleEnumType[],
//         dates: value.dates,
//         informationLink: value.informationLink,
//         signupLink: value.signupLink,
//         signupLinkVisibleTo: value.signupLinkVisibleTo as VisibleEnumType[],
//       },
//     });

//     toast.success("Calendar event was successfully created");
//     router.navigate({ to: "/admin/calendar" });
//   }

//   // Create a default empty calendar form values object.
//   const emptyCalendar: CalendarFormValues = {
//     id: crypto.randomUUID(),
//     eventId: null,
//     status: "draft",
//     title: "",
//     description: "",
//     location: "",
//     dates: [],
//     visibleTo: ["everyone"],
//     signupLinkVisibleTo: ["everyone"],
//   };

//   return (
//     <div>
//       <BackTo to="/admin/calendar" label="Calendar Admin" />
//       <PageHeader>
//         <PageTitle>
//           Create <span className="text-destructive">New Event</span>
//         </PageTitle>
//         <PageDescription>Create a new Event to appear on the Calendar.</PageDescription>
//       </PageHeader>

//       <EventForm defaultValues={emptyCalendar} onSubmit={(values) => handleSubmit(values)} />
//     </div>
//   );
// }
