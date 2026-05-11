import { Roles } from "@/lib/auth/permissions";
import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import z from "zod";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

const VisibleToOptions = [Roles.Everyone, Roles.Student, Roles.Mentor, Roles.Parent] as const;

interface CalendarDate {
  startAt: Date;
  endAt: Date;
}

interface Calendar {
  title: string;
  description: string;
  location: string;
  visibleTo: Array<string>;
  dates: Array<CalendarDate>;
  signupLink?: string | undefined;
  signupLinkVisibleTo: Array<string>;
}

const defaultCalendar: Calendar = {
  title: "",
  description: "",
  location: "",
  visibleTo: [Roles.Everyone],
  dates: [] as CalendarDate[],
  signupLinkVisibleTo: [Roles.Student, Roles.Mentor],
};

const dateSchema = z.object({
  startAt: z.date(),
  endAt: z.date(),
});

const calendarSchema = z
  .object({
    title: z.string().trim().min(1, "Title is required"),
    description: z.string().trim().min(1, "Description is required"),
    location: z.string().trim().min(1, "Location is required"),
    visibleTo: z
      .array(z.enum(VisibleToOptions))
      .min(1, "At least one visibility option must be selected"),

    dates: z.array(dateSchema).min(1, "At least one date range is required"),

    signupLink: z.url().optional().or(z.literal("")),
    signupLinkVisibleTo: z
      .array(z.enum(VisibleToOptions))
      .min(1, "At least one visibility option must be selected"),
  })
  .refine(
    (data) => {
      // TODO: This is messy but easy to follow.
      if (data.signupLink === undefined) {
        return true;
      } else if (data.signupLink.trim() !== "") {
        return true;
      } else if (data.signupLinkVisibleTo.length > 0) {
        return true;
      }

      return false;
    },
    {
      message: "Must select visibility options if signup link is provided",
      path: ["signupLinkVisibleTo"],
    },
  );

export const TestForm = () => {
  const [showSignup, setShowSignup] = useState<boolean>(false);

  const form = useForm({
    defaultValues: defaultCalendar,
    onSubmit: async ({ value }) => {
      // Do something with form data
      console.log("onSubmit", value);
    },
    validators: {
      onSubmit: calendarSchema,
    },
  });

  function handleShow() {
    //console.log(form.state.values);
    console.log("form.state.values:", JSON.stringify(form.state.values, null, 2));
    console.log("form.state.errorMap:", JSON.stringify(form.state.errorMap, null, 2));
  }

  function handleToggleHasSignup(checked: boolean) {
    setShowSignup(checked);
    if (!checked) {
      form.state.values.signupLink = "";
      form.state.values.signupLinkVisibleTo = [Roles.Student, Roles.Mentor];
    }
  }

  function handleAddDate() {
    form.setFieldValue("dates", [
      ...form.getFieldValue("dates"),
      { startAt: new Date(), endAt: new Date() },
    ]);
  }

  function handleRemoveDate(index: number) {
    const newDates = form.getFieldValue("dates").filter((_, i) => i !== index);
    form.setFieldValue("dates", newDates);
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="max-w-1/2 mx-auto"
    >
      <div className="flex flex-col gap-6">
        {/* Title */}
        <form.Field
          name="title"
          children={(field) => (
            <div>
              <Label className="mb-3 font-bold text-lg">Title:</Label>
              <Input
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                placeholder="Enter the title"
                autoComplete="off"
                type="text"
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <ul className="text-red-600 list-disc list-inside">
                {field.state.meta.errors.map((e) => {
                  return (
                    <li className="" key={e?.message}>
                      {e?.message}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        />

        {/* Dates */}
        <div>
          <Label className="mb-3 font-bold text-lg">Dates:</Label>
          <div>
            [Date] [Time From] - [Time Through] <Button onClick={() => handleAddDate()}>Add</Button>
          </div>
          <form.Subscribe
            selector={(state) => state.values.dates}
            children={(date) => (
              <form.Field name="dates" mode="array">
                {(field) => (
                  <>
                    {field.state.value.map((date, index) => (
                      <div key={index}>
                        {date.startAt.toISOString()} - {date.endAt.toISOString()}{" "}
                        <Button onClick={() => handleRemoveDate(index)}>[X]</Button>
                      </div>
                    ))}
                  </>
                )}
              </form.Field>
            )}
          />
        </div>

        {/* Location */}
        <form.Field
          name="location"
          children={(field) => (
            <div>
              <Label className="mb-3 font-bold text-lg">Location:</Label>
              <Input
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                placeholder="Enter the location"
                autoComplete="off"
                type="text"
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <ul className="text-red-600 list-disc list-inside">
                {field.state.meta.errors.map((e) => {
                  return (
                    <li className="" key={e?.message}>
                      {e?.message}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        />

        {/* Description */}
        <form.Field
          name="description"
          children={(field) => (
            <div>
              <Label className="mb-3 font-bold text-lg">Description:</Label>
              <Textarea
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                placeholder="Enter a description. Multiple lines are supported."
                autoComplete="off"
                rows={5}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <ul className="text-red-600 list-disc list-inside">
                {field.state.meta.errors.map((e) => {
                  return (
                    <li className="" key={e?.message}>
                      {e?.message}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        />

        {/* Visible To */}
        <form.Field
          name="visibleTo"
          children={(field) => (
            <div>
              <Label className="mb-3 font-bold text-lg">Calendar event will be visible to:</Label>
              <div className="space-y-2">
                {VisibleToOptions.map((option) => (
                  <div key={option}>
                    <label className="flex flex-row gap-3 cursor-pointer select-none capitalize">
                      <Checkbox
                        name={field.name}
                        value={option}
                        key={`calendar-visibleTo-${option}`}
                        checked={field.state.value.includes(option)}
                        onCheckedChange={(checked) => {
                          const newValue = checked
                            ? [...field.state.value, option]
                            : field.state.value.filter((v) => v !== option);
                          field.handleChange(newValue);
                        }}
                        className="w-6 h-6"
                      />
                      {option}
                    </label>
                  </div>
                ))}
              </div>
              <ul className="text-red-600 list-disc list-inside">
                {field.state.meta.errors.map((e) => {
                  return (
                    <li className="" key={e?.message}>
                      {e?.message}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        />

        {/* Signup Options */}
        <div className="flex flex-col my-6">
          <div className="flex flex-row">
            <Checkbox
              id="has-signup"
              checked={showSignup}
              onCheckedChange={(checked) => handleToggleHasSignup(checked ? true : false)}
              className="data-[state=checked]:bg-blue-600 w-6 h-6"
            />
            <Label htmlFor="has-signup" className="ml-2 cursor-pointer font-bold text-lg">
              Has a Signup Form
            </Label>
          </div>

          {showSignup && (
            <div className="space-y-4 pl-6 mt-3">
              {/* Signup Link */}
              <form.Field
                name="signupLink"
                children={(field) => (
                  <div>
                    <Label className="mb-3 font-bold text-lg">Signup URL:</Label>
                    <Input
                      name={field.name}
                      value={field.state.value ?? ""}
                      onBlur={field.handleBlur}
                      placeholder="Enter link"
                      autoComplete="off"
                      type="text"
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    <ul className="text-red-600 list-disc list-inside">
                      {field.state.meta.errors.map((e) => {
                        return (
                          <li className="" key={e?.message}>
                            {e?.message}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
              />

              {/* Signup Link Visible To */}
              <form.Field
                name="signupLinkVisibleTo"
                children={(field) => (
                  <div>
                    <Label className="mb-3 font-bold text-lg">Signup URL will be visible to:</Label>
                    <div className="space-y-2">
                      {VisibleToOptions.map((option) => (
                        <div key={option}>
                          <label className="flex flex-row gap-3 cursor-pointer select-none capitalize">
                            <Checkbox
                              name={field.name}
                              value={option}
                              checked={field.state.value.includes(option)}
                              onCheckedChange={(checked) => {
                                const newValue = checked
                                  ? [...field.state.value, option]
                                  : field.state.value.filter((v) => v !== option);
                                field.handleChange(newValue);
                              }}
                              className="w-6 h-6"
                            />
                            {option}
                          </label>
                        </div>
                      ))}
                    </div>
                    <ul className="text-red-600 list-disc list-inside">
                      {field.state.meta.errors.map((e) => {
                        return (
                          <li className="" key={e?.message}>
                            {e?.message}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
              />
            </div>
          )}
        </div>
      </div>

      {/* Form buttons */}
      <div className="mt-8 space-x-4">
        <Button type="submit">Submit</Button>
        <Button onClick={handleShow}>Show Current</Button>
      </div>
    </form>
  );
};
