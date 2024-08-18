import { z } from "zod";
import { useMutation } from "@tanstack/react-query";

import axios from "../../../lib/axios";
import { queryClient } from "../../../lib/react-query";
import { Post } from "../../../types/types";

const MAX_FILE_SIZE = 2000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const createCommentSchema = z
  .object({
    comment: z
      .string()
      .max(200, { message: "Comment cannot exceed 200 characters." }),
    image: z
      .any()
      .refine(
        (file) =>
          file.length == 1
            ? ACCEPTED_IMAGE_TYPES.includes(file?.[0]?.type)
              ? true
              : false
            : true,
        "Invalid file. choose either JPEG or PNG image"
      )
      .refine(
        (file) =>
          file.length == 1
            ? file[0]?.size <= MAX_FILE_SIZE
              ? true
              : false
            : true,
        "Max file size allowed is 8MB."
      ),
  })
  .partial()
  .refine(
    (data) => data.comment !== "" || data.image.length !== 0,
    "Don't leave comment empty"
  );

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
      queryClient.setQueryData(["post", data.postId], (post: Post) => {
        return { ...post, comments: [data, ...post.comments] };
      });
    },
  });
};
