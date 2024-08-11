import Post from "../post/post";

export default function PostList({ posts }) {
  return (
    <div className="flex flex-col gap-4">
      {posts.map((post) => (
        <Post post={post} key={post.id} />
      ))}
    </div>
  );
}
