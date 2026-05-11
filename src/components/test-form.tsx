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

interface Calendar {
  title: string;
  description: string;
  visibleTo: Array<string>;
  signupLink?: string | undefined;
  signupLinkVisibleTo: Array<string>;
}
const defaultCalendar: Calendar = {
  title: "",
  description: "",
  visibleTo: [Roles.Everyone],
  signupLinkVisibleTo: [Roles.Student, Roles.Mentor],
};

const calendarSchema = z
  .object({
    title: z.string().trim().min(1, "Title is required"),
    description: z.string().trim().min(1, "Description is required"),
    visibleTo: z
      .array(z.enum(VisibleToOptions))
      .min(1, "At least one visibility option must be selected"),

    signupLink: z.url().optional().or(z.literal("")),
    signupLinkVisibleTo: z
      .array(z.enum(VisibleToOptions))
      .min(1, "At least one visibility option must be selected"),
  })
  .refine(
    (data) => {
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
      console.log(value);
    },
    validators: {
      onChange: calendarSchema,
    },
  });

  function handleShow() {
    console.log(form.state.values);
    console.log(JSON.stringify(form.state.errorMap, null, 2));
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
              <Label className="mb-3">Title</Label>
              <Input
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                placeholder="Enter title"
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
              <Label className="mb-3">Description</Label>
              <Textarea
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                placeholder="Enter a longer description. Multiple lines are supported."
                autoComplete="off"
                rows={10}
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
              <Label className="mb-3">Visible To</Label>
              <div className="space-y-2">
                {VisibleToOptions.map((option) => (
                  <div key={option}>
                    <label className="flex flex-row gap-3 cursor-pointer select-none capitalize">
                      <Input
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
        <div className="flex flex-row items-center gap-2">
          <Checkbox
            id="has-signup"
            onCheckedChange={(checked) => setShowSignup((prev) => !prev)}
            className="data-[state=checked]:bg-blue-600"
          />
          <Label htmlFor="has-signup" className="ml-2 cursor-pointer">
            Has Signup
          </Label>
        </div>
        {showSignup && (
          <div className="space-y-4">
            {/* Signup Link */}
            <form.Field
              name="signupLink"
              children={(field) => (
                <div>
                  <Label className="mb-3">Signup URL</Label>
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
                  <Label className="mb-3">Signup URL Visible To</Label>
                  <div className="space-y-2">
                    {VisibleToOptions.map((option) => (
                      <div key={option}>
                        <label className="flex flex-row gap-3 cursor-pointer select-none capitalize">
                          <Input
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

      {/* Form buttons */}
      <div className="mt-8 space-x-4">
        <Button type="submit">Submit</Button>
        <Button onClick={handleShow}>Show</Button>
      </div>
    </form>
  );
};
