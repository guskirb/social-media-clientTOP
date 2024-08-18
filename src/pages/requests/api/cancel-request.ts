import { QueryFilters, useMutation } from "@tanstack/react-query";

import axios from "../../../lib/axios";
import { queryClient } from "../../../lib/react-query";
import { Request } from "../../../types/types";
import useAuthStore from "../../../hooks/use-auth-store";

export const cancelRequest = async (userId: string) => {
  try {
    const response = await axios.post(`/users/${userId}/request/cancel`);
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const useCancelRequest = () => {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: (userId: string) => cancelRequest(userId),
    onSuccess: (data) => {
      const queryFilter: QueryFilters = { queryKey: ["requests"] };

      queryClient.setQueriesData<{
        success: boolean;
        requests: Array<Request>;
        outgoingRequests: Array<Request>;
      }>(queryFilter, (oldData) => {
        return {
          success: true,
          outgoingRequests: oldData!.outgoingRequests.filter(
            (request) => request.id !== data.request.id
          ),
          requests: oldData!.requests,
        };
      });

      setUser({
        ...user!,
        friends: [data.request.fromUserId, ...user!.friends],
        outgoingRequests: user!.outgoingRequests.filter(
          (request) => request !== data.request.toUserId
        ),
      });
    },
  });
};
