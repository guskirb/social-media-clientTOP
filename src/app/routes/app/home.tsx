import Head from "../../../components/seo/head";
import {
  getPostsQueryOptions,
  usePosts,
} from "../../../pages/home/api/get-posts";
import Home from "../../../pages/home/home";
import { QueryClient } from "@tanstack/react-query";

export const postsLoader = (queryClient: QueryClient) => async () => {
  const postsQuery = getPostsQueryOptions();

  return (
    queryClient.getQueryData(postsQuery.queryKey) ??
    (await queryClient.fetchQuery(postsQuery))
  );
};

export const HomeRoute = () => {
  const { data: posts, isLoading, refetch } = usePosts();

  return (
    <>
      <Head title="Home" />
      {posts?.posts ? <Home posts={posts?.posts} refetch={refetch} /> : "lol"}
    </>
  );
};
