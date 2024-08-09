import Container from "../container/container";
import { Link } from "react-router-dom";
import { ThumbsUp, MessageSquare } from "lucide-react";

import ProfileImg from "../profile/profile-img";
import { useState } from "react";
import useAuthStore from "../../../hooks/use-auth-store";

export default function Post({ post }) {
  const [currPost, setCurrPost] = useState(post);
  const user = useAuthStore((state) => state.user);

  const onClickLike = () => {
    setCurrPost({
      ...currPost,
      likedBy: [...currPost.likedBy, { id: user!.id }],
    });
  };

  const onClickUnlike = () => {
    setCurrPost({
      ...currPost,
      likedBy: currPost.likedBy.filter((item) => item.id !== user!.id),
    });
  };
  return (
    <Container>
      <div className="p-4 flex gap-2 bg-white">
        <Link to={`/profile/${currPost.author.username}`}>
          <ProfileImg image={currPost.author.profileImg} />
        </Link>
        <div className="flex flex-col gap-2 w-full">
          <div className="flex gap-2 items-center">
            <Link to={`/profile/${currPost.author.username}`}>
              <p className="font-semibold">{currPost.author.username}</p>
            </Link>
            <p className="text-sm opacity-70">{currPost.createdFormatted}</p>
          </div>
          <div className="mt-[-5px] flex flex-col gap-1">
            <p>{currPost.post}</p>
            {currPost.postImg && (
              <img src={currPost.postImg} className="rounded-xl w-full" />
            )}
          </div>
          <div className="flex gap-5 justify-between">
            <div className="flex items-center gap-1">
              <MessageSquare size={17} color="#7a7a7a" />
              <p className="text-sm opacity-70">{currPost.comments.length}</p>
            </div>
            <div className="flex items-center gap-1">
              {currPost.likedBy.find((like) => like.id === user!.id) ? (
                <ThumbsUp
                  size={17}
                  color="#f87171"
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

              <p className="text-sm opacity-70">{currPost.likedBy?.length}</p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
