import { approveRequestFn } from "@/server/functions/calendar/approveRequest";
import { deleteDraftEventFn } from "@/server/functions/calendar/deleteDraftEvent";
import { deletePublishedEventFn } from "@/server/functions/calendar/deletePublishedEvent";
import { getDraftEvents } from "@/server/functions/calendar/getDraftEvents";
import { getPublishedEventsFn } from "@/server/functions/calendar/getPublishedEvents";
import { requestApprovalCalendarFn } from "@/server/functions/calendar/requestApproval";
import { queryOptions, useMutation, useQueryClient } from "@tanstack/react-query";

export const eventQueries = {
  draftsKey: ["draft-events"],
  publishedKey: ["published-events"],

  drafts: () =>
    queryOptions({
      queryKey: [eventQueries.draftsKey],
      queryFn: async () => await getDraftEvents(),
    }),

  published: () =>
    queryOptions({
      queryKey: [eventQueries.publishedKey],
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
        queryKey: [eventQueries.draftsKey],
      });
    },
  });
}

export function useApproveMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await approveRequestFn({ data: { id } });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [eventQueries.draftsKey, eventQueries.publishedKey],
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
        queryKey: [eventQueries.draftsKey],
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
        queryKey: [eventQueries.publishedKey],
      });
    },
  });
}
