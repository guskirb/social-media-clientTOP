import { useMutation } from "@tanstack/react-query";

import axios from "../../../../lib/axios";
import { queryClient } from "../../../../lib/react-query";

export const deleteComment = async (comment: any) => {
  try {
    const response = await axios.post(
      `/posts/${comment.postId}/comments/${comment.id}/delete`
    );
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const useDeleteComment = () => {
  return useMutation({
    mutationFn: (comment) => deleteComment(comment),
    onSuccess: (data) => {
      queryClient.setQueryData(
        ["post", data.comment.postId],
        (post: object) => {
          return {
            ...post,
            comments: post.comments.filter(
              (comment) => comment.id !== data.comment.id
            ),
          };
        }
      );
    },
  });
};
