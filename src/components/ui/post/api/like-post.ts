import { useMutation } from "@tanstack/react-query";

import axios from "../../../../lib/axios";
import { queryClient } from "../../../../lib/react-query";

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
      queryClient.setQueriesData(["posts", "likes"], (posts) => {
        return posts.map((post) =>
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
      queryClient.setQueriesData(["posts", "likes"], (posts) => {
        return posts.map((post) =>
          post.id === data.post.id ? data.post : post
        );
      });
    },
  });
};
