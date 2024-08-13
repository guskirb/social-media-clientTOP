import { queryOptions, useQuery } from "@tanstack/react-query";
import axios from "../../../lib/axios";

export const getPostQueryOptions = (post: any) => {
  return queryOptions({
    queryKey: ["post", post.id],
    queryFn: () => getPost(post.id),
    initialData: post,
  });
};

export const getPost = async (id: string) => {
  try {
    const response = await axios.get(`/posts/${id}`);
    return response.data.post;
  } catch (error: any) {
    return error.response.data;
  }
};

export const usePost = (post: any) => {
  return useQuery({ ...getPostQueryOptions(post) });
};
