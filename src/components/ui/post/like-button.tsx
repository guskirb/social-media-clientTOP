import { ThumbsUp } from "lucide-react";
import React from "react";

import useAuthStore from "../../../hooks/use-auth-store";
import { useLikePost, useUnlikePost } from "./api/like-post";
import { Post, User } from "../../../types/types";

interface LikeButtonProps {
  post: Post;
  setCurrPost: (post: any) => void;
}

export default function LikeButton({ post, setCurrPost }: LikeButtonProps) {
  const user = useAuthStore((state) => state.user);
  const { mutate: likePost } = useLikePost();
  const { mutate: unlikePost } = useUnlikePost();

  const onClickLike = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrPost({
      ...post,
      likedBy: [...(post.likedBy as Array<User>), { id: user!.id }],
    });
    likePost(post.id);
  };

  const onClickUnlike = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrPost({
      ...post,
      likedBy: post.likedBy!.filter((item) => item.id !== user!.id),
    });
    unlikePost(post.id);
  };

  return (
    <>
      {post.likedBy!.find((like) => like.id === user!.id) ? (
        <ThumbsUp
          size={17}
          color="#ef4444"
          className="cursor-pointer"
          onClick={onClickUnlike}
        />
      ) : (
        <ThumbsUp
          size={17}
          className="opacity-70 cursor-pointer hover:scale-110 hover:rotate-12 hover:stroke-red-500 transition-all"
          onClick={onClickLike}
        />
      )}
    </>
  );
}
