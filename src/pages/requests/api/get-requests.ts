import { queryOptions, useQuery } from "@tanstack/react-query";
import axios from "../../../lib/axios";

export const getRequestsQueryOptions = () => {
  return queryOptions({
    queryKey: ["requests"],
    queryFn: getRequests,
  });
};

export const getRequests = async () => {
  try {
    const response = await axios.get(`/users/requests`);
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const useRequests = () => {
  return useQuery({ ...getRequestsQueryOptions() });
};
