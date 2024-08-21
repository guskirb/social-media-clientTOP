import Head from "../../../components/seo/head";
import PostPage from "../../../pages/post/post";
import { useParams } from "react-router-dom";
import { usePost } from "../../../pages/post/api/get-post";
import Loader from "../../../components/ui/loader/loader";

export const PostRoute = () => {
  const { id } = useParams();
  const { data: post } = usePost(id!);

  return (
    <>
      <Head
        title={
          post &&
          `${post?.author?.name ? post?.author.name : post?.author.username}${
            post.post ? ": " + post?.post.slice(0, 25) + "..." : ""
          }`
        }
      />
      {post ? <PostPage post={post} /> : <Loader />}
    </>
  );
};
