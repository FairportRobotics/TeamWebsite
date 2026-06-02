import { approveRequest } from "@/server/functions/calendar/approveRequest";
import { deleteCalendarFn } from "@/server/functions/calendar/deleteCalendar";
import { getCalendarListDetailsFn } from "@/server/functions/calendar/getCalendarDetails";
import { getCalendarListForAdminFn } from "@/server/functions/calendar/getCalendarListForAdmin";
import { requestApprovalCalendarFn } from "@/server/functions/calendar/requestApproval";
import { queryOptions, useMutation, useQueryClient } from "@tanstack/react-query";

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

export function useRequestApprovalMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: calendarMutations.requestApproval,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: calendarQueries.all,
      });
    },
  });
}

export function useApproveMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: calendarMutations.approve,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: calendarQueries.all,
      });
    },
  });
}

export function useDeleteMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: calendarMutations.delete,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: calendarQueries.all,
      });
    },
  });
}
