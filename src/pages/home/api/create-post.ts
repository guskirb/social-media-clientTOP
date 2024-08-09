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
