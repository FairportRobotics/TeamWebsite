import { approveRequest } from "@/server/functions/calendar/approveRequest";
import { deleteCalendarFn } from "@/server/functions/calendar/deleteCalendar";
import { getCalendarListDetailsFn } from "@/server/functions/calendar/getCalendarDetails";
import { getCalendarListForAdminFn } from "@/server/functions/calendar/getCalendarListForAdmin";
import { requestApprovalCalendarFn } from "@/server/functions/calendar/requestApproval";
import { queryOptions } from "@tanstack/react-query";

export const calendarQueries = {
  all: ["calendars"],
  list: (filters?: string) =>
    queryOptions({
      queryKey: [...calendarQueries.all, "list", filters],
      queryFn: () => getCalendarListForAdminFn(),
    }),
  details: (id: string) =>
    queryOptions({
      queryKey: [...calendarQueries.all, "details", id],
      queryFn: () => getCalendarListDetailsFn({ data: { id } }),
    }),
};

export const calendarMutations = {
  requestApproval: (id: string) => requestApprovalCalendarFn({ data: { id } }),
  approve: (id: string) => approveRequest({ data: { id } }),
  delete: (id: string) => deleteCalendarFn({ data: { id } }),
};
