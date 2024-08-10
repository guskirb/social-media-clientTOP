import { ThumbsUp } from "lucide-react";

import useAuthStore from "../../../hooks/use-auth-store";
import { useLikePost, useUnlikePost } from "./api/like-post";

export default function LikeButton({ post, setCurrPost }) {
  const user = useAuthStore((state) => state.user);
  const { mutate: likePost } = useLikePost();
  const { mutate: unlikePost } = useUnlikePost();

  const onClickLike = () => {
    setCurrPost({
      ...post,
      likedBy: [...post.likedBy, { id: user!.id }],
    });
    likePost(post.id);
  };

  const onClickUnlike = () => {
    setCurrPost({
      ...post,
      likedBy: post.likedBy.filter((item) => item.id !== user!.id),
    });
    unlikePost(post.id);
  };

  return (
    <>
      {post.likedBy.find((like) => like.id === user!.id) ? (
        <ThumbsUp
          size={17}
          color="#ef4444"
          fill="#f87171"
          className="cursor-pointer"
          onClick={onClickUnlike}
        />
      ) : (
        <ThumbsUp
          size={17}
          color="#7a7a7a"
          className="cursor-pointer hover:scale-110 hover:rotate-12 hover:stroke-red-400 transition-all"
          onClick={onClickLike}
        />
      )}
    </>
  );
}
