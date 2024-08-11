import { useMutation } from "@tanstack/react-query";

import axios from "../../../../lib/axios";
import { queryClient } from "../../../../lib/react-query";
import useAuthStore from "../../../../hooks/use-auth-store";

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
      queryClient.setQueriesData(["posts", "likes"], (posts) => {
        return posts.filter((post) => post.id !== data.id);
      });
    },
  });
};
