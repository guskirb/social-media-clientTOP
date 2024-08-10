import { queryOptions, useQuery } from "@tanstack/react-query";
import axios from "../../../lib/axios";

export const getPostsQueryOptions = () => {
  return queryOptions({
    queryKey: ["posts"],
    queryFn: getPosts,
  });
};

export const getPosts = async () => {
  try {
    const response = await axios.get(`/posts`);
    return response.data.posts;
  } catch (error: any) {
    return error.response.data;
  }
};

export const usePosts = () => {
  return useQuery({ ...getPostsQueryOptions() });
};
