import { queryOptions, useQuery } from "@tanstack/react-query";

import axios from "../../../../lib/axios";

export const getRecentUsersQueryOptions = () => {
  return queryOptions({
    queryKey: ["users", "recent"],
    queryFn: getRecentUsers,
  });
};

export const getRecentUsers = async () => {
  try {
    const response = await axios.get(`/users?limit=${6}`);
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const useRecentUsers = () => {
  return useQuery({ ...getRecentUsersQueryOptions() });
};
