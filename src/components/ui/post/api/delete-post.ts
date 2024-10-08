import { InfiniteData, QueryFilters, useMutation } from "@tanstack/react-query";

import axios from "../../../../lib/axios";
import { queryClient } from "../../../../lib/react-query";
import { Page } from "../../../../types/types";

export const deletePost = async (postId: string) => {
  try {
    const response = await axios.post(`/posts/${postId}/delete`);
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const useDeletePost = () => {
  return useMutation({
    mutationFn: (postId: string) => deletePost(postId),
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
              posts: page.posts.filter((post) => post.id !== data.id),
            })),
          };
        }
      );
    },
  });
};
