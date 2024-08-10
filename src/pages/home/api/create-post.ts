import { z } from "zod";
import { useMutation } from "@tanstack/react-query";

import axios from "../../../lib/axios";
import { queryClient } from "../../../lib/react-query";

export const createPostSchema = z
  .object({
    post: z.string(),
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
    onSuccess: (data) => {
      queryClient.setQueryData(["posts"], (posts) => {
        return [data.post, ...posts];
      });
    },
  });
};
