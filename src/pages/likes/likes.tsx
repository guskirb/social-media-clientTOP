import PostList from "../../components/ui/post-list/post-list";
import { Post } from "../../types/types";

export default function Likes({ posts }: { posts: Array<Post> }) {
  return <PostList posts={posts} />;
}
