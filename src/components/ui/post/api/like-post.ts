import { QueryFilters, useMutation } from "@tanstack/react-query";

import axios from "../../../../lib/axios";
import { queryClient } from "../../../../lib/react-query";
import { Post } from "../../../../types/types";

export const likePost = async (postId: string) => {
  try {
    const response = await axios.post(`/posts/${postId}/like`);
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const unlikePost = async (postId: string) => {
  try {
    const response = await axios.post(`/posts/${postId}/unlike`);
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const useLikePost = () => {
  return useMutation({
    mutationFn: (postId: string) => likePost(postId),
    onSuccess: (data) => {
      queryClient.setQueryData(["posts"], (posts?: Array<Post>) => {
        return posts!.map((post) =>
          post.id === data.post.id ? data.post : post
        );
      });
    },
  });
};

export const useUnlikePost = () => {
  return useMutation({
    mutationFn: (postId: string) => unlikePost(postId),
    onSuccess: (data) => {
      queryClient.setQueryData(["posts"], (posts?: Array<Post>) => {
        return posts!.map((post) =>
          post.id === data.post.id ? data.post : post
        );
      });
    },
  });
};
