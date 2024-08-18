import { useMutation } from "@tanstack/react-query";

import axios from "../../../lib/axios";
import { queryClient } from "../../../lib/react-query";
import useAuthStore from "../../../hooks/use-auth-store";
import { Request } from "../../../types/types";

export const sendRequest = async (id: string) => {
  try {
    const response = await axios.post(`/users/${id}/request`);
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const useSendRequest = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const user = useAuthStore((state) => state.user);
  return useMutation({
    mutationFn: (id: string) => sendRequest(id),
    onSuccess: (data) => {
      setUser({
        ...user!,
        outgoingRequests: [data.request.toUserId, ...user?.outgoingRequests!],
      });

      queryClient.setQueryData<{
        success: boolean;
        requests: Array<Request>;
        outgoingRequests: Array<Request>;
      }>(["requests"], (requests) => {
        return {
          ...requests!,
          outgoingRequests: [data.request, ...requests!.outgoingRequests],
        };
      });
    },
  });
};
