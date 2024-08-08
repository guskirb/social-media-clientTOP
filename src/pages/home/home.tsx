import PostList from "../../components/ui/post-list/post-list";

export default function Home({posts}) {

  return (
    <PostList posts={posts}/>
  );
}
