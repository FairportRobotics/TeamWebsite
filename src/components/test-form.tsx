import { Roles } from "@/lib/auth/permissions";
import { useForm } from "@tanstack/react-form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

const VisibleToOptions = [Roles.Everyone, Roles.Student, Roles.Mentor, Roles.Parent] as const;

interface Calendar {
  title: string;
  description: string;
  visibleTo: Array<string>;
}
const defaultCalendar: Calendar = { title: "", description: "", visibleTo: [Roles.Everyone] };

export const TestForm = () => {
  const form = useForm({
    defaultValues: defaultCalendar,
    onSubmit: async ({ value }) => {
      // Do something with form data
      console.log(value);
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <div className="flex flex-col gap-6">
        {/* Title */}
        <form.Field
          name="title"
          validators={{
            onBlur: ({ value }) => (value.trim() === "" ? "Title is required" : undefined),
          }}
          children={(field) => (
            <div>
              <Label>Title</Label>
              <Input
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                type="text"
                onChange={(e) => field.handleChange(e.target.value)}
              />
              {!field.state.meta.isValid && <em>{field.state.meta.errors.join(",")}</em>}
            </div>
          )}
        />

        {/* Description */}
        <form.Field
          name="description"
          validators={{
            onBlur: ({ value }) => (value.trim() === "" ? "Description is required" : undefined),
          }}
          children={(field) => (
            <div>
              <Label>Description</Label>
              <Textarea
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                rows={10}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              {!field.state.meta.isValid && <em>{field.state.meta.errors.join(",")}</em>}
            </div>
          )}
        />

        {/* Visible To */}
        <form.Field
          name="visibleTo"
          validators={{
            // We can choose between form-wide and field-specific validators
            onBlur: ({ value }) =>
              value.length === 0 ? "At least one visibility option must be selected" : undefined,
          }}
          children={(field) => (
            <div>
              <Label>Visible To</Label>
              {VisibleToOptions.map((option) => (
                <div key={option}>
                  <label>
                    <input
                      type="checkbox"
                      name={field.name}
                      value={option}
                      checked={field.state.value.includes(option)}
                      onChange={(e) => {
                        const newValue = e.target.checked
                          ? [...field.state.value, option]
                          : field.state.value.filter((v) => v !== option);
                        field.handleChange(newValue);
                      }}
                    />
                    {option}
                  </label>
                </div>
              ))}
              {!field.state.meta.isValid && <em>{field.state.meta.errors.join(",")}</em>}
            </div>
          )}
        />
      </div>

      <div className="mt-8">
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
};
