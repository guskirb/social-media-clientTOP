import Post from "../post/post";

export default function PostList({posts}) {
  return (
    <div className="flex flex-col gap-2 pt-2">
        {posts.map((post) => (
            <Post post={post}/>
        ))}
    </div>
  )
}
