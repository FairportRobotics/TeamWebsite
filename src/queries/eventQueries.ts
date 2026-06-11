import { approveRequestFn } from "@/server/functions/calendar/approveRequest";
import { deleteDraftEventFn } from "@/server/functions/calendar/deleteDraftEvent";
import { deletePublishedEventFn } from "@/server/functions/calendar/deletePublishedEvent";
import { getDraftEventsFn } from "@/server/functions/calendar/getDraftEvents";
import { getPublishedEventsFn } from "@/server/functions/calendar/getPublishedEvents";
import { requestApprovalCalendarFn } from "@/server/functions/calendar/requestApproval";
import { queryOptions, useMutation, useQueryClient } from "@tanstack/react-query";

export const eventKeys = {
  all: ["events"] as const,
  drafts: () => [...eventKeys.all, "drafts"] as const,
  published: () => [...eventKeys.all, "published"] as const,
};

export const eventQueries = {
  drafts: () =>
    queryOptions({
      queryKey: eventKeys.drafts(),
      queryFn: async () => await getDraftEventsFn(),
    }),

  published: () =>
    queryOptions({
      queryKey: eventKeys.published(),
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
        queryKey: eventKeys.drafts(),
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
        queryKey: eventKeys.all,
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
        queryKey: eventKeys.drafts(),
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
        queryKey: eventKeys.published(),
      });
    },
  });
}
