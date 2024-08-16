import { InfiniteData, QueryClient } from "@tanstack/react-query";

import Head from "../../../components/seo/head";
import {
  getPostsQueryOptions,
  usePosts,
} from "../../../pages/home/api/get-posts";
import Home from "../../../pages/home/home";
import { Page } from "../../../types/types";

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

  return (
    <>
      <Head title="Home" />
      <Home
        posts={posts as InfiniteData<Page, string | null>}
        isLoading={isLoading}
        fetchNextPage={fetchNextPage}
        isFetchingNextPage={isFetchingNextPage}
      />
    </>
  );
};
