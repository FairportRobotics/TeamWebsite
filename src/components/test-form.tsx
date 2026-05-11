import { Roles } from "@/lib/auth/permissions";
import { useForm } from "@tanstack/react-form";
import { format } from "date-fns";
import { ChevronDownIcon, Plus, Trash2 } from "lucide-react";
import * as React from "react";
import { useState } from "react";
import z from "zod";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

import { Calendar } from "@/components/ui/calendar";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

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
  informationLink?: string | undefined;
  signupLink?: string | undefined;
  signupLinkVisibleTo?: Array<string>;
}

const defaultCalendar: Calendar = {
  title: "",
  description: "",
  location: "",
  visibleTo: [Roles.Everyone],
  dates: [] as CalendarDate[],
  informationLink: undefined,
  signupLink: undefined,
  signupLinkVisibleTo: [] as Array<string>,
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
    informationLink: z.url().optional().or(z.literal("")),
    signupLink: z.url().optional().or(z.literal("")),
    signupLinkVisibleTo: z.array(z.enum(VisibleToOptions)),
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
  const [showInformation, setShowInformation] = useState<boolean>(false);
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

  function handleToggleHasInformation(checked: boolean) {
    setShowInformation(checked);
    if (!checked) {
      form.state.values.informationLink = "";
    }
  }

  function handleToggleHasSignup(checked: boolean) {
    setShowSignup(checked);
    if (!checked) {
      form.state.values.signupLink = "";
      form.state.values.signupLinkVisibleTo = [];
    }
  }

  function handleAddDate(startAt: Date, endAt: Date) {
    form.setFieldValue("dates", [...form.getFieldValue("dates"), { startAt, endAt }]);
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

        {/* Dates */}
        <form.Field
          name="dates"
          children={(field) => (
            <div>
              <Label className="mb-3 font-bold text-lg">Event dates:</Label>
              <DateTimeRangePicker
                dateSelected={(startDate, endDate) => handleAddDate(startDate, endDate)}
              />
              <div>
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
              <div className="gap-2 flex flex-col mt-4">
                {field.state.value
                  .sort((a, b) => a.startAt.toISOString().localeCompare(b.endAt.toISOString()))
                  .map((date, index) => (
                    <div
                      key={index}
                      className="flex flex-row items-center hover:bg-slate-800 rounded-md p-1"
                    >
                      <Button
                        onClick={() => handleRemoveDate(index)}
                        variant="destructive"
                        className="hover:cursor-pointer mr-3 w-8 h-8"
                      >
                        <Trash2 className="" />
                      </Button>
                      <div className="flex flex-row gap-3">
                        <span>{date.startAt.toLocaleDateString()}</span>
                        <span>from</span>
                        <span>{date.startAt.toLocaleTimeString()}</span>
                        <span>to</span>
                        <span>{date.endAt.toLocaleTimeString()}</span>
                      </div>
                    </div>
                  ))}
              </div>
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

        {/* Information Options */}
        <div className="flex flex-col mt-6">
          <div className="flex flex-row">
            <Checkbox
              id="has-signup"
              checked={showInformation}
              onCheckedChange={(checked) => handleToggleHasInformation(checked ? true : false)}
              className="data-[state=checked]:bg-blue-600 w-6 h-6"
            />
            <Label htmlFor="has-signup" className="ml-2 cursor-pointer font-bold text-lg">
              Include a link for more information?
            </Label>
          </div>
          {showInformation && (
            <div className="space-y-4 pl-6 mt-3">
              <form.Field
                name="informationLink"
                children={(field) => (
                  <div>
                    <Label className="mb-3 font-bold text-lg">Information URL:</Label>
                    <Input
                      name={field.name}
                      value={field.state.value ?? ""}
                      onBlur={field.handleBlur}
                      placeholder="Enter information URL"
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
            </div>
          )}
        </div>

        {/* Signup Options */}
        <div className="flex flex-col mt-6">
          <div className="flex flex-row">
            <Checkbox
              id="has-signup"
              checked={showSignup}
              onCheckedChange={(checked) => handleToggleHasSignup(checked ? true : false)}
              className="data-[state=checked]:bg-blue-600 w-6 h-6"
            />
            <Label htmlFor="has-signup" className="ml-2 cursor-pointer font-bold text-lg">
              Include a link to a signup form?
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
                      placeholder="Enter signup URL"
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

export function DateTimeRangePicker({
  dateSelected,
}: {
  dateSelected: (startAt: Date, endAt: Date) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  const [startAt, setStartAt] = React.useState<string>("08:00:00");
  const [endAt, setEndAt] = React.useState<string>("17:00:00");

  function handleAdd() {
    if (!date) return;

    console.log("handleAdd called");
    console.log(date, " : ", startAt, " - ", endAt);

    const dateOnly = date?.toISOString().substring(0, 11);
    const startDate = new Date(dateOnly + startAt);
    const endDate = new Date(dateOnly + endAt);

    console.log(startDate, " through ", endDate);

    dateSelected(startDate, endDate);
  }

  return (
    <FieldGroup className="max-w-xs flex-row">
      <Field>
        <FieldLabel htmlFor="date-picker">Date</FieldLabel>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" id="date-picker" className="w-40 justify-between font-normal">
              {date ? format(date, "PPP") : "Select date"}
              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              captionLayout="dropdown"
              defaultMonth={date}
              onSelect={(date) => {
                setDate(date);
                setOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>
      </Field>
      <Field className="w-36">
        <FieldLabel htmlFor="time-from">Start Time</FieldLabel>
        <Input
          type="time"
          id="time-from"
          step="1"
          value={startAt}
          onChange={(value) => setStartAt(value.target.value)}
          className="appearance-none bg-background [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
        />
      </Field>
      <Field className="w-36">
        <FieldLabel htmlFor="time-through">End Time</FieldLabel>
        <Input
          type="time"
          id="time-through"
          step="1"
          value={endAt}
          onChange={(value) => setEndAt(value.target.value)}
          className="appearance-none bg-background [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
        />
      </Field>
      <Field className="items-end justify-end">
        <Button onClick={() => handleAdd()} className="" variant="secondary">
          <Plus className="" />
        </Button>
      </Field>
    </FieldGroup>
  );
}
