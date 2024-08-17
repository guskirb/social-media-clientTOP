import { QueryFilters, useMutation } from "@tanstack/react-query";

import axios from "../../../lib/axios";
import { queryClient } from "../../../lib/react-query";
import { Request } from "../../../types/types";
import useAuthStore from "../../../hooks/use-auth-store";

export const acceptRequest = async (userId: string) => {
  try {
    const response = await axios.post(`/users/${userId}/request/accept`);
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const useAcceptRequest = () => {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: (userId: string) => acceptRequest(userId),
    onSuccess: (data) => {
      const queryFilter: QueryFilters = { queryKey: ["requests"] };

      queryClient.setQueriesData<{
        success: boolean;
        requests: Array<Request>;
        outgoingRequests: Array<Request>;
      }>(queryFilter, (oldData) => {
        return {
          success: true,
          requests: oldData!.requests.filter(
            (request) => request.id !== data.request.id
          ),
          outgoingRequests: oldData!.outgoingRequests,
        };
      });

      setUser({
        ...user!,
        friends: [data.from.id, ...user!.friends],
      });
    },
  });
};

export const declineRequest = async (userId: string) => {
  try {
    const response = await axios.post(`/users/${userId}/request/decline`);
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const useDeclineRequest = () => {
  return useMutation({
    mutationFn: (userId: string) => declineRequest(userId),
    onSuccess: (data) => {
      const queryFilter: QueryFilters = { queryKey: ["requests"] };

      queryClient.setQueriesData<{
        success: boolean;
        requests: Array<Request>;
        outgoingRequests: Array<Request>;
      }>(queryFilter, (oldData) => {
        return {
          success: true,
          requests: oldData!.requests.filter(
            (request) => request.id !== data.request.id
          ),
          outgoingRequests: oldData!.outgoingRequests,
        };
      });
    },
  });
};
