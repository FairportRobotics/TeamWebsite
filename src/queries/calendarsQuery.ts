import { getCalendarListForAdminFn } from "@/server/functions/calendar/getCalendarListForAdmin";
import { queryOptions } from "@tanstack/react-query";

export const calendarsQuery = queryOptions({
  queryKey: ["calendars"],
  queryFn: () => getCalendarListForAdminFn(),
});
