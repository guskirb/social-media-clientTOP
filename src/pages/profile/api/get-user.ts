import { queryOptions, useQuery } from "@tanstack/react-query";
import axios from "../../../lib/axios";

export const getUserQueryOptions = (username: string) => {
  return queryOptions({
    queryKey: ["user", username],
    queryFn: () => getUser(username),
  });
};

export const getUser = async (username: string) => {
  try {
    const response = await axios.get(`/users/username/${username}`);
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const useUser = (username: string) => {
  return useQuery({ ...getUserQueryOptions(username) });
};
