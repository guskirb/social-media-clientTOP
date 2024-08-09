import Head from "../../../components/seo/head";
import { usePosts } from "../../../pages/home/api/get-posts";
import Home from "../../../pages/home/home";

export const HomeRoute = () => {
  const { data: posts, isLoading, refetch } = usePosts();

  return (
    <>
      <Head title="Home" />
      {posts?.posts ? <Home posts={posts?.posts} refetch={refetch} /> : "lol"}
    </>
  );
};
