import { approveRequestFn } from "@/server/functions/calendar/approveRequest";
import { deleteDraftEventFn } from "@/server/functions/calendar/deleteDraftEvent";
import { deletePublishedEventFn } from "@/server/functions/calendar/deletePublishedEvent";
import { getDraftEventsFn } from "@/server/functions/calendar/getDraftEvents";
import { getPublishedEventsFn } from "@/server/functions/calendar/getPublishedEvents";
import { rejectRequestFn } from "@/server/functions/calendar/rejectRequest";
import { requestApprovalCalendarFn } from "@/server/functions/calendar/requestApproval";
import { queryOptions, useMutation, useQueryClient } from "@tanstack/react-query";

const eventKeys = {
  all: ["events"] as const,
  drafts: () => [...eventKeys.all, "drafts"] as const,
  published: () => [...eventKeys.all, "published"] as const,
  details: () => [...eventKeys.all, "detail"] as const,
  detail: (id: string) => [...eventKeys.details(), id] as const,
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
      return id;
    },

    onSuccess: async (id: string) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: eventKeys.drafts(),
        }),
        queryClient.invalidateQueries({
          queryKey: eventKeys.detail(id),
        }),
      ]);
    },
  });
}

export function useRejectMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, rejectReason }: { id: string; rejectReason: string }) => {
      await rejectRequestFn({ data: { id, rejectReason } });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: eventKeys.all,
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
