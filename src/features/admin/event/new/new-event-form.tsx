import { useAppForm } from "@/components/form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { VisibleEnumType } from "@/db/schema";
import { newEventSchema } from "@/features/admin/event/new/new-event-schema";
import { VisibleToOptions } from "@/server/functions/calendar/_common";
import { createEventFn } from "@/server/functions/calendar/createEvent";
import { useRouter } from "@tanstack/react-router";
import { toast } from "sonner";

type CalendarDate = {
  startAt: Date;
  endAt: Date;
};

type CalendarFormValues = {
  id?: string | null;
  eventId?: string | null;
  title: string;
  description: string;
  location: string;
  visibleTo: Array<string>;
  dates: Array<CalendarDate>;
  informationLink?: string | undefined;
  signupLink?: string | undefined;
  signupLinkVisibleTo: Array<string>;
  status: string | undefined;
};

// Create a default empty calendar form values object.
const defaultNewEvent: CalendarFormValues = {
  id: crypto.randomUUID(),
  eventId: null,
  status: "draft",
  title: "",
  description: "",
  location: "",
  dates: [],
  visibleTo: ["everyone"],
  informationLink: "",
  signupLink: "",
  signupLinkVisibleTo: ["everyone"],
};

export function NewEventForm({ className, ...props }: React.ComponentProps<"div">) {
  const router = useRouter();

  const form = useAppForm({
    defaultValues: defaultNewEvent,
    validators: {
      onChange: newEventSchema,
    },
    onSubmit: async ({ value }) => {
      await createEventFn({
        data: {
          title: value.title,
          description: value.description,
          location: value.location,
          visibleTo: value.visibleTo as VisibleEnumType[],
          dates: value.dates,
          informationLink: value.informationLink,
          signupLink: value.signupLink,
          signupLinkVisibleTo: value.signupLinkVisibleTo as VisibleEnumType[],
        },
      });

      toast.success("Draft Event was successfully created");
      router.navigate({ to: "/admin/calendar" });
    },
  });

  const visibleToOptions = VisibleToOptions.map((v) => ({
    label: v.charAt(0).toUpperCase() + v.slice(1),
    value: v,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Title</CardTitle>
        <CardDescription>Description</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="flex flex-col gap-5"
        >
          {/* Hidden fields for new/edit support */}
          <form.AppField name="id">{(field) => <field.HiddenField />}</form.AppField>
          <form.AppField name="eventId">{(field) => <field.HiddenField />}</form.AppField>

          {/* Title */}
          <form.AppField name="title">{(field) => <field.TextField label="Title" required={true} />}</form.AppField>

          {/* Description */}
          <form.AppField name="description">
            {(field) => <field.TextareaField label="Description" required={true} rows={5} />}
          </form.AppField>

          {/* Location */}
          <form.AppField name="location">
            {(field) => <field.TextareaField label="Location" required={true} rows={2} />}
          </form.AppField>

          {/* Dates */}
          <form.AppField name="dates">
            {(field) => <field.DatesSelectionField label="Event Dates and Times" required={true} />}
          </form.AppField>

          {/* Event Visibility */}
          <form.AppField name="visibleTo">
            {(field) => (
              <field.MultiCheckboxField label="Event should be visible to" required={true} options={visibleToOptions} />
            )}
          </form.AppField>

          {/* Information Link */}
          <form.AppField name="informationLink">
            {(field) => <field.UrlField label="Information Link" required={false} />}
          </form.AppField>

          {/* Signup Link */}
          <form.AppField name="signupLink">
            {(field) => <field.UrlField label="Signup Form Link" required={false} />}
          </form.AppField>
          <form.AppField name="signupLinkVisibleTo">
            {(field) => (
              <field.MultiCheckboxField label="Signup form should be visible to" options={visibleToOptions} />
            )}
          </form.AppField>

          <form.AppForm>
            <form.SubmitButton>Submit</form.SubmitButton>
          </form.AppForm>
        </form>
      </CardContent>
      <CardFooter>Footer</CardFooter>
    </Card>
  );
}
