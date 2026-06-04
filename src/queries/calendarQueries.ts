import { approveRequest } from "@/server/functions/calendar/approveRequest";
import { deleteEventFn } from "@/server/functions/calendar/deleteEvent";
import { deleteEventDraftFn } from "@/server/functions/calendar/deleteEventDraft";
import { getEventListDetailsFn } from "@/server/functions/calendar/getEventDetails";
import {
  getEventListForAdminFn,
  type DraftEventAdminItem,
} from "@/server/functions/calendar/getEventListForAdmin";
import { requestApprovalCalendarFn } from "@/server/functions/calendar/requestApproval";
import { queryOptions, useMutation, useQueryClient } from "@tanstack/react-query";

export const calendarQueries = {
  all: ["calendars"],
  list: (filters?: string) =>
    queryOptions({
      queryKey: [...calendarQueries.all, "list", filters],
      queryFn: () => getEventListForAdminFn(),
    }),
  details: (id: string) =>
    queryOptions({
      queryKey: [...calendarQueries.all, "details", id],
      queryFn: () => getEventListDetailsFn({ data: { id } }),
    }),
};

export function useRequestApprovalMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      requestApprovalCalendarFn({ data: { id } });
    },

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
    mutationFn: async (id: string) => {
      approveRequest({ data: { id } });
    },

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
    mutationFn: async (code: string) => {
      deleteEventFn({ data: { code } });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: calendarQueries.all,
      });
    },
  });
}

export function useDeleteDraftMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      deleteEventDraftFn({ data: { id } });
    },

    onSuccess: () => {
      queryClient.setQueryData([calendarQueries.all], (oldData: DraftEventAdminItem[]) => {
        console.log("useDeleteDraftMutation onSuccess");
        return oldData.filter((d) => !d.id);
      });
    },
  });
}
