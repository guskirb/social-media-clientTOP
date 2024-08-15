import { useMutation } from "@tanstack/react-query";

import axios from "../../../../lib/axios";
import { queryClient } from "../../../../lib/react-query";
import { Post } from "../../../../types/types";

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
    onSuccess: (data) => {
      queryClient.setQueryData(["posts"], (posts: Array<Post>) => {
        return posts.filter((post) => post.id !== data.id);
      });
    },
  });
};
