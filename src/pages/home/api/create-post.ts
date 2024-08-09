import { z } from "zod";

import axios from "../../../lib/axios";

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
