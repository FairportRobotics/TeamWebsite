import { approveRequest } from "@/server/functions/calendar/approveRequest";
import { deleteDraftEventFn } from "@/server/functions/calendar/deleteDraftEvent";
import { deletePublishedEventFn } from "@/server/functions/calendar/deletePublishedEvent";
import { getDraftEvents } from "@/server/functions/calendar/getDraftEvent";
import { getPublishedEventsFn } from "@/server/functions/calendar/getPublishedEvents";
import { requestApprovalCalendarFn } from "@/server/functions/calendar/requestApproval";
import { queryOptions, useMutation, useQueryClient } from "@tanstack/react-query";

export const calendarQueries = {
  draftsKey: ["draft-events"],
  publishedKey: ["published-events"],

  drafts: () =>
    queryOptions({
      queryKey: [calendarQueries.draftsKey],
      queryFn: async () => await getDraftEvents(),
    }),

  published: () =>
    queryOptions({
      queryKey: [calendarQueries.publishedKey],
      queryFn: async () => await getPublishedEventsFn(),
    }),
};

export function useRequestApprovalMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await requestApprovalCalendarFn({ data: { id } });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [calendarQueries.draftsKey],
      });
    },
  });
}

export function useApproveMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await approveRequest({ data: { id } });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [calendarQueries.draftsKey],
      });
    },
  });
}

export function useDeleteDraftMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await deleteDraftEventFn({ data: { id } });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [calendarQueries.draftsKey],
      });
    },
  });
}

export function useDeletePublishedMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await deletePublishedEventFn({ data: { id } });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [calendarQueries.publishedKey],
      });
    },
  });
}
