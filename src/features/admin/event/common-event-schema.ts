import { VisibleToOptions } from "@/server/functions/calendar/_common";
import { z } from "zod";

// Create a schema for validating the date ranges for calendar events. We will use this as a
// nested schema in the main calendar insert and update schema.
export const eventDateSchema = z.object({
  id: z.string().optional(), // Optional for insert, required for update
  startAt: z.date(),
  endAt: z.date(),
});

export const editEventSchema = z
  .object({
    id: z.string().nullable(),
    eventId: z.string().nullable(),
    status: z.string(),
    title: z.string().trim().min(1, "Title is required"),
    description: z.string().trim().min(1, "Description is required"),
    location: z.string().trim().min(1, "Location is required"),
    visibleTo: z.array(z.enum(VisibleToOptions)).min(1, "At least one visibility option must be selected"),
    dates: z.array(eventDateSchema).min(1, "At least one date range is required"),
    informationLink: z.url().optional().or(z.literal("")),
    signupLink: z.url().optional().or(z.literal("")),
    signupLinkVisibleTo: z.array(z.enum(VisibleToOptions)),
  })
  .refine(
    (data) => {
      // TODO: This is messy but easy to follow.
      if (data.signupLink === undefined) {
        return true;
      } else if (data.signupLink.trim() === "") {
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
