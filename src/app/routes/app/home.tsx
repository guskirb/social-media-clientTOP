import { QueryClient } from "@tanstack/react-query";

import Head from "../../../components/seo/head";
import {
  getPostsQueryOptions,
  usePosts,
} from "../../../pages/home/api/get-posts";
import Home from "../../../pages/home/home";
import { useEffect } from "react";

// export const postsLoader = (queryClient: QueryClient) => async () => {
//   const postsQuery = getPostsQueryOptions();

//   return (
//     queryClient.getQueryData(postsQuery.queryKey) ??
//     (await queryClient.fetchQuery(postsQuery))
//   );
// };

export const HomeRoute = () => {
  const {
    data: posts,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
  } = usePosts();
  useEffect(() => {
    console.log(posts);
  }, [posts]);

  return (
    <>
      <Head title="Home" />
      <Home
        posts={posts?.pages}
        isLoading={isLoading}
        fetchNextPage={fetchNextPage}
        isFetchingNextPage={isFetchingNextPage}
      />
    </>
  );
};
