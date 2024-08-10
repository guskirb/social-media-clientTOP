import { QueryClient } from "@tanstack/react-query";

import Head from "../../../components/seo/head";
import Loader from "../../../components/ui/loader/loader";
import {
  getPostsQueryOptions,
  usePosts,
} from "../../../pages/home/api/get-posts";
import Home from "../../../pages/home/home";

export const postsLoader = (queryClient: QueryClient) => async () => {
  const postsQuery = getPostsQueryOptions();

  return (
    queryClient.getQueryData(postsQuery.queryKey) ??
    (await queryClient.fetchQuery(postsQuery))
  );
};

export const HomeRoute = () => {
  const { data: posts, isLoading, refetch } = usePosts();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Head title="Home" />
      {posts ? <Home posts={posts} refetch={refetch} /> : "No Posts"}
    </>
  );
};
