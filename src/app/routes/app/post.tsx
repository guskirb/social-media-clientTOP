import { useLocation } from "react-router-dom";
import Head from "../../../components/seo/head";
import PostPage from "../../../pages/post/post";
import { useEffect } from "react";

export const PostRoute = () => {
  const location = useLocation();
  const { post } = location.state;

  useEffect(() => {
    console.log(post);
  }, []);
  return (
    <>
      <Head />
      {/* <PostPage post={post} /> */}
    </>
  );
};
