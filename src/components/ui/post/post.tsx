import Container from "../container/container";
import { Link } from "react-router-dom";
import { MessageSquare, Ellipsis } from "lucide-react";

import ProfileImg from "../profile/profile-img";
import { useState } from "react";
import useAuthStore from "../../../hooks/use-auth-store";
import LikeButton from "./like-button";

export default function Post({ post }) {
  const [currPost, setCurrPost] = useState(post);
  const user = useAuthStore((state) => state.user);

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
            <Ellipsis size={17} color="#7a7a7a" className="ml-auto"/>
          </div>
          <div className="mt-[-5px] flex flex-col gap-1">
            <p className="whitespace-pre-wrap">{currPost.post}</p>
            {currPost.postImg && (
              <img src={currPost.postImg} className="rounded-xl w-full" />
            )}
          </div>
          <div className="flex gap-5 justify-between  pt-2">
            <div className="flex items-center gap-1">
              <MessageSquare size={17} color="#7a7a7a" />
              <p className="text-sm opacity-70">{currPost.comments.length}</p>
            </div>
            <div className="flex items-center gap-1">
              <LikeButton post={currPost} setCurrPost={setCurrPost} />
              <p className="text-sm opacity-70">{currPost.likedBy?.length}</p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
