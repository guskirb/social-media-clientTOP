import { z } from "zod";
import { InfiniteData, QueryFilters, useMutation } from "@tanstack/react-query";

import axios from "../../../lib/axios";
import { queryClient } from "../../../lib/react-query";
import { Page } from "../../../types/types";

export const createPostSchema = z
  .object({
    post: z
      .string()
      .max(200, { message: "Post cannot exceed 200 characters." }),
    image: z.any(),
  })
  .partial()
  .refine((data) => data.post || data.image, "Don't leave post empty");

export type CreatePostFormFields = z.infer<typeof createPostSchema>;

export const createPost = async (data: FormData) => {
  try {
    const response = await axios.post("/posts/create", data);
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const useCreatePost = () => {
  return useMutation({
    mutationFn: (data: FormData) => createPost(data),
    onSuccess: async (data) => {
      const queryFilter: QueryFilters = { queryKey: ["posts"] };

      await queryClient.cancelQueries(queryFilter);

      queryClient.setQueriesData<InfiniteData<Page, string | null>>(
        queryFilter,
        (oldData) => {
          const firstPage = oldData?.pages[0];
          if (firstPage) {
            return {
              pageParams: oldData.pageParams,
              pages: [
                {
                  posts: [data.post, ...firstPage.posts],
                  nextPage: firstPage.nextPage,
                },
                ...oldData.pages.slice(1),
              ],
            };
          }
        }
      );

      queryClient.invalidateQueries({
        queryKey: queryFilter.queryKey,
        predicate(query) {
          return !query.state.data;
        },
      });
    },
  });
};
