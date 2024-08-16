import { InfiniteData, QueryFilters, useMutation } from "@tanstack/react-query";

import axios from "../../../../lib/axios";
import { queryClient } from "../../../../lib/react-query";
import { Page } from "../../../../types/types";

export const likePost = async (postId: string) => {
  try {
    const response = await axios.post(`/posts/${postId}/like`);
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const unlikePost = async (postId: string) => {
  try {
    const response = await axios.post(`/posts/${postId}/unlike`);
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const useLikePost = () => {
  return useMutation({
    mutationFn: (postId: string) => likePost(postId),
    onSuccess: async (data) => {
      const queryFilter: QueryFilters = { queryKey: ["posts"] };

      await queryClient.cancelQueries(queryFilter);

      queryClient.setQueriesData<InfiniteData<Page, string | null>>(
        queryFilter,
        (oldData) => {
          if (!oldData) return;

          return {
            pageParams: oldData.pageParams,
            pages: oldData.pages.map((page) => ({
              nextPage: page.nextPage,
              posts: page.posts.map((post) =>
                post.id === data.post.id ? data.post : post
              ),
            })),
          };
        }
      );
    },
  });
};

export const useUnlikePost = () => {
  return useMutation({
    mutationFn: (postId: string) => unlikePost(postId),
    onSuccess: async (data) => {
      const queryFilter: QueryFilters = { queryKey: ["posts"] };

      await queryClient.cancelQueries(queryFilter);

      queryClient.setQueriesData<InfiniteData<Page, string | null>>(
        queryFilter,
        (oldData) => {
          if (!oldData) return;

          return {
            pageParams: oldData.pageParams,
            pages: oldData.pages.map((page) => ({
              nextPage: page.nextPage,
              posts: page.posts.map((post) =>
                post.id === data.post.id ? data.post : post
              ),
            })),
          };
        }
      );
    },
  });
};
