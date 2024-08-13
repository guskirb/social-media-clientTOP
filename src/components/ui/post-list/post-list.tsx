import { Link } from "react-router-dom";
import Post from "../post/post";

export default function PostList({ posts }) {
  return (
    <div className="flex flex-col gap-4">
      {posts.length !== 0 ? (
        posts.map((post) => (
          <Link to={`/post/${post.id}`}>
            <Post post={post} key={post.id} />
          </Link>
        ))
      ) : (
        <div className="w-full flex justify-center items-center p-5">
          <p className="text-lg font-normal">No posts to display</p>
        </div>
      )}
    </div>
  );
}
