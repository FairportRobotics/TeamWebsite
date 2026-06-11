import { eventDateSchema } from "@/features/admin/events/_common/event-date.schema";
import { VisibleToOptions } from "@/server/functions/calendar/_common";
import { z } from "zod";

export const commonEventSchema = z
  .object({
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
      // Make sure Signup Link Visiblity is set when a link is provided.
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
      message: "At least on visibility option must be selected if signup link is provided",
      path: ["signupLinkVisibleTo"],
    },
  );
