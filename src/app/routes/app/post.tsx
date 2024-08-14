
import Head from "../../../components/seo/head";
import PostPage from "../../../pages/post/post";
import { usePosts } from "../../../pages/home/api/get-posts";
import { useParams } from "react-router-dom";
import { usePost } from "../../../pages/post/api/get-post";
import Loader from "../../../components/ui/loader/loader";

export const PostRoute = () => {
  const { id } = useParams();
  const { data: posts } = usePosts();
  const currPost = posts ? posts.find((item) => item.id === id) : null;
  const { data: post } = usePost(currPost, id!);

  return (
    <>
      <Head
        title={`${
          post?.author?.name ? post?.author.name : post?.author.username
        }: "${post?.post}"`}
      />
      {post ? <PostPage post={post} /> : <Loader />}
    </>
  );
};
