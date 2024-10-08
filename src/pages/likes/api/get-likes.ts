import { infiniteQueryOptions, useInfiniteQuery } from "@tanstack/react-query";
import axios from "../../../lib/axios";

export const getLikesQueryOptions = (username: string) => {
  return infiniteQueryOptions({
    queryKey: ["likes", username],
    queryFn: ({ pageParam = 1 }) => getLikes({ username, pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
  });
};

export const getLikes = async ({
  username,
  pageParam,
}: {
  username: string;
  pageParam: any;
}) => {
  try {
    const response = await axios.get(
      `/users/${username}/likes?page=${pageParam}&limit=10`
    );
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const useLikes = (username: string) => {
  return useInfiniteQuery({ ...getLikesQueryOptions(username) });
};
