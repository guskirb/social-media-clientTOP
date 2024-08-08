import { useEffect } from "react";
import Container from "../container/container";
import ProfileImg from "../profile/profile-img";
import { Link } from "react-router-dom";

export default function Post({ post }) {
  useEffect(() => {
    console.log(post);
  }, []);
  return (
    <Container>
      <div className="p-3 flex gap-2 bg-white">
        <Link to={`/profile/${post.author.username}`}>
          <ProfileImg image={post.author.profileImg} />
        </Link>
        <div className="flex flex-col">
          <div className="flex gap-2 items-center">
            <Link to={`/profile/${post.author.username}`}>
              <p className="font-semibold">{post.author.username}</p>
            </Link>
            <p className="text-sm opacity-70">{post.createdFormatted}</p>
          </div>
          <p>{post.post}</p>
        </div>
      </div>
    </Container>
  );
}
