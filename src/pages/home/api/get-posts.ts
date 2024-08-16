import {
  infiniteQueryOptions,
  useInfiniteQuery,
} from "@tanstack/react-query";
import axios from "../../../lib/axios";

export const getPostsQueryOptions = () => {
  return infiniteQueryOptions({
    queryKey: ["posts"],
    queryFn: getPosts,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
  });
};

export const getPosts = async ({ pageParam }) => {
  try {
    const response = await axios.get(`/posts?page=${pageParam}&limit=10`);
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const usePosts = () => {
  return useInfiniteQuery({ ...getPostsQueryOptions() });
};
