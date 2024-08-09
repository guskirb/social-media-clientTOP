import axios from "../../../../lib/axios";

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
