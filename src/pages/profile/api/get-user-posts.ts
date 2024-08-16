import { infiniteQueryOptions, useInfiniteQuery } from "@tanstack/react-query";
import axios from "../../../lib/axios";

export const getUserPostsQueryOptions = (username: string) => {
  return infiniteQueryOptions({
    queryKey: ["posts", username],
    queryFn: ({ pageParam = 1 }) => getUserPosts({ username, pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
  });
};

export const getUserPosts = async ({
  username,
  pageParam,
}: {
  username: string;
  pageParam: any;
}) => {
  try {
    const response = await axios.get(
      `/users/${username}/posts?page=${pageParam}&limit=10`
    );
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const useUserPosts = (username: string) => {
  return useInfiniteQuery({ ...getUserPostsQueryOptions(username) });
};
