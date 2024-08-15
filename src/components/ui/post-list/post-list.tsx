import { Link } from "react-router-dom";
import Post from "../post/post";
import CommentList from "../comment-list/comment-list";

export default function PostList({ posts }) {
  return (
    <div className="flex flex-col gap-4">
      {posts.length !== 0 ? (
        posts.map((post) => (
          <Link
            to={`/post/${post.id}`}
            key={post.id}
            className="flex flex-col gap-2"
          >
            <Post post={post} />
            {post.comments.length > 0 && (
              <CommentList comments={post.comments.slice(0, 1)} />
            )}
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
