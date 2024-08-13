import { queryOptions, useQuery } from "@tanstack/react-query";
import axios from "../../../lib/axios";

export const getPostQueryOptions = (post: any, id: string) => {
  return queryOptions({
    queryKey: ["post", id],
    queryFn: () => getPost(id),
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

export const usePost = (post: any, id: string) => {
  return useQuery({ ...getPostQueryOptions(post, id) });
};
