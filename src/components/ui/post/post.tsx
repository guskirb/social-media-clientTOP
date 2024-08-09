import Container from "../container/container";
import { Link } from "react-router-dom";
import { ThumbsUp, MessageSquare } from "lucide-react";

import ProfileImg from "../profile/profile-img";

export default function Post({ post }) {
  return (
    <Container>
      <div className="p-4 flex gap-2 bg-white">
        <Link to={`/profile/${post.author.username}`}>
          <ProfileImg image={post.author.profileImg} />
        </Link>
        <div className="flex flex-col gap-2 w-full">
          <div className="flex gap-2 items-center">
            <Link to={`/profile/${post.author.username}`}>
              <p className="font-semibold">{post.author.username}</p>
            </Link>
            <p className="text-sm opacity-70">{post.createdFormatted}</p>
          </div>
          <div className="mt-[-5px] flex flex-col gap-1">
            <p>{post.post}</p>
            {post.postImg && (
              <img src={post.postImg} className="rounded-xl w-full" />
            )}
          </div>
          <div className="flex gap-5 justify-between">
            <div className="flex items-center gap-1">
              <MessageSquare size={15} color="#7a7a7a" />
              <p className="text-sm opacity-70">{post.comments.length}</p>
            </div>
            <div className="flex items-center gap-1">
              <ThumbsUp size={15} color="#7a7a7a" />
              <p className="text-sm opacity-70">{post.likedBy?.length}</p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
