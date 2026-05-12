// prettier-ignore
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoadingSwap } from "@/components/ui/loading-swap";
import { Permissions, Roles } from "@/lib/auth/permissions";
import { assertHasAnyPermission } from "@/lib/auth/server";
import { getCalendarForEditFn } from "@/lib/fn/calendar";
import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const Route = createFileRoute("/admin/calendar/$id/edit")({
  beforeLoad: async ({ context }) => {
    assertHasAnyPermission(context.session?.user.role, [Permissions.EventUpdate]);
  },
  component: RouteComponent,
  loader: async ({ params }) => {
    const results = await getCalendarForEditFn({ data: { id: params.id } });
    return results;
  },
});

function RouteComponent() {
  const data = Route.useLoaderData();
  const params = Route.useParams();

  if (!data) {
    throw redirect({ to: "/unauthorized" });
  }

  const form = useForm({
    resolver: zodResolver(calendarSchema),
    defaultValues: {
      visibleTo: data.visibleTo ?? [Roles.Everyone],
      title: data.title ?? "",
      description: data.description ? data.description.join("\r\n") : "",
      location: data.location,
      informationLink: data.informationLink ?? "",
      signupLink: data.signupLink ?? "",
      signupLinkVisibleTo: data.signupLinkVisibleTo ?? [Roles.Student, Roles.Mentor],
    },
  });

  const { isSubmitting } = form.formState;

  async function handleSubmit(data: CalendarForm) {
    console.log("handleSubmit", data);
  }

  return (
    <div>
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(handleSubmit)}>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input type="text" autoComplete="" {...field} placeholder="Event title" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="visibleTo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Visible To</FormLabel>
                <FormControl></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <LoadingSwap isLoading={isSubmitting}>
            <Button type="submit" className="w-full " disabled={isSubmitting}>
              Save
            </Button>
          </LoadingSwap>
        </form>
      </Form>
    </div>
  );
}

const visibleToOptions = [Roles.Everyone, Roles.Student, Roles.Mentor, Roles.Parent] as const;

const calendarDatesSchema = z.object({
  startAt: z.date(),
  endAt: z.date(),
});

const calendarSchema = z.object({
  visibleTo: z.string().array().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  location: z.string().min(1),
  informationLink: z.string(),
  signupLink: z.string(),
  signupLinkVisibleTo: z.string().array(),
  dates: z.array(calendarDatesSchema).nonempty(),
});

type CalendarForm = z.infer<typeof calendarSchema>;
