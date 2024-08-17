import { QueryFilters, useMutation } from "@tanstack/react-query";

import axios from "../../../lib/axios";
import { queryClient } from "../../../lib/react-query";
import { Request } from "../../../types/types";

export const cancelRequest = async (userId: string) => {
  try {
    const response = await axios.post(`/users/${userId}/request/cancel`);
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const useCancelRequest = () => {
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
    },
  });
};
