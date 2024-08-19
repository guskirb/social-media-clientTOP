import { queryOptions, useQuery } from "@tanstack/react-query";

import axios from "../../../lib/axios";

export const getSearchUsersQueryOptions = (search: string) => {
  return queryOptions({
    queryKey: ["users", search],
    queryFn: getSearchUsers,
  });
};

export const getSearchUsers = async ({ queryKey }: { queryKey: any }) => {
  try {
    const response = await axios.get(`/users?search=${queryKey[1]}`);
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const useSearchUsers = (search: string) => {
  return useQuery({ ...getSearchUsersQueryOptions(search) });
};
