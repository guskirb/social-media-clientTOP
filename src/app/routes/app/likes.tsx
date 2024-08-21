import { InfiniteData } from "@tanstack/react-query";

import Head from "../../../components/seo/head";
import { useLikes } from "../../../pages/likes/api/get-likes";
import Likes from "../../../pages/likes/likes";
import useAuthStore from "../../../hooks/use-auth-store";
import { Page } from "../../../types/types";

// export const likesLoader = (queryClient: QueryClient) => async () => {
//   const likesQuery = getLikesQueryOptions();

//   return (
//     queryClient.getQueryData(likesQuery.queryKey) ??
//     (await queryClient.fetchQuery(likesQuery))
//   );
// };

export const LikesRoute = () => {
  const user = useAuthStore((state) => state.user);
  const {
    data: posts,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
  } = useLikes(user!.username);

  return (
    <>
      <Head title="Likes" />
      <Likes
        posts={posts as InfiniteData<Page, string | null>}
        isLoading={isLoading}
        fetchNextPage={fetchNextPage}
        isFetchingNextPage={isFetchingNextPage}
      />
    </>
  );
};
