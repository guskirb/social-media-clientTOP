import { z } from "zod";
import { useMutation } from "@tanstack/react-query";

import axios from "../../../lib/axios";
import { queryClient } from "../../../lib/react-query";

export const createCommentSchema = z
  .object({
    comment: z.string(),
    image: z.any(),
  })
  .partial()
  .refine((data) => data.comment || data.image, "Don't leave comment empty");

export type CreateCommentFormFields = z.infer<typeof createCommentSchema>;

export const createComment = async (data: FormData, id: string) => {
  try {
    const response = await axios.post(`/posts/${id}/comments`, data);
    return response.data.comment;
  } catch (error: any) {
    return error.response.data;
  }
};

export const useCreateComment = () => {
  return useMutation({
    mutationFn: ({ data, id }: { data: FormData; id: string }) =>
      createComment(data, id),
    onSuccess: (data) => {
      console.log(data);
      queryClient.setQueryData(["post", data.postId], (post: object) => {
        console.log(post);
        return { ...post, comments: [data, ...post.comments] };
      });
    },
  });
};
