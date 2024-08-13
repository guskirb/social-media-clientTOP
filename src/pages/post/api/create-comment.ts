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
