import { useAppForm } from "@/components/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { editEventSchema } from "@/features/admin/event/common-event-schema";
import { VisibleToOptions } from "@/server/functions/calendar/_common";

export type CalendarDate = {
  startAt: Date;
  endAt: Date;
};

export type CalendarFormValues = {
  id?: string | null | undefined;
  eventId?: string | null | undefined;
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

export function CommonEventForm({
  defaultValues,
  onSubmit,
}: {
  defaultValues: CalendarFormValues;
  onSubmit: (values: CalendarFormValues) => void;
}) {
  const form = useAppForm({
    defaultValues: defaultValues,
    validators: {
      onChange: editEventSchema,
    },
    onSubmit: async ({ value }) => {
      onSubmit(value);
    },
  });

  const visibleToOptions = VisibleToOptions.map((v) => ({
    label: v.charAt(0).toUpperCase() + v.slice(1),
    value: v,
  }));

  return (
    <Card className="w-full max-w-2xl mx-auto">
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
          className="flex flex-col gap-8"
        >
          {/* Hidden fields for new/edit support */}
          <form.AppField name="id">{(field) => <field.HiddenField />}</form.AppField>
          <form.AppField name="eventId">{(field) => <field.HiddenField />}</form.AppField>
          <form.AppField name="status">{(field) => <field.HiddenField />}</form.AppField>

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
    </Card>
  );
}
