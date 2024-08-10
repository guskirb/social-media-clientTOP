import { queryOptions, useQuery } from "@tanstack/react-query";
import axios from "../../../lib/axios";

export const getLikesQueryOptions = () => {
  return queryOptions({
    queryKey: ["likes"],
    queryFn: getLikes,
  });
};

export const getLikes = async () => {
  try {
    const response = await axios.get(`/users/me`);
    return response.data.user.likes;
  } catch (error: any) {
    return error.response.data;
  }
};

export const useLikes = () => {
  return useQuery({ ...getLikesQueryOptions() });
};
