import { getListForAdminFn } from "@/server/functions/user/getListForAdmin";
import { getUserDetailsFn } from "@/server/functions/user/getUserDetails";
import { revokeUserSessionFn } from "@/server/functions/user/revokeUserSession";
import { revokeAllUserSessionsFn } from "@/server/functions/user/revokeUserSessions";
import { queryOptions, useMutation, useQueryClient } from "@tanstack/react-query";

export const userQueries = {
  usersKey: "user-list",
  detailsKey: "user-details",

  list: () =>
    queryOptions({
      queryKey: [userQueries.usersKey],
      queryFn: () => getListForAdminFn(),
    }),

  details: (userId: string) =>
    queryOptions({
      queryKey: [userQueries.detailsKey, userId] as const,
      queryFn: () => getUserDetailsFn({ data: { userId: userId } }),
    }),
};

export function useRevokeUserSessionMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, sessionToken }: { userId: string; sessionToken: string }) => {
      await revokeUserSessionFn({ data: { sessionToken } });
      return userId;
    },
    onSuccess: (userId) => {
      queryClient.invalidateQueries({
        queryKey: [userQueries.detailsKey, userId],
      });
    },
  });
}

export function useRevokeUserSessionsMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId: string) => {
      await revokeAllUserSessionsFn({ data: { userId } });
      return userId;
    },

    onSuccess: (userId) => {
      queryClient.invalidateQueries({
        queryKey: [userQueries.detailsKey, userId],
      });
    },
  });
}
