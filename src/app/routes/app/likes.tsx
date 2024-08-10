import { QueryClient } from "@tanstack/react-query";

import Head from "../../../components/seo/head";
import Loader from "../../../components/ui/loader/loader";
import {
  getLikesQueryOptions,
  useLikes,
} from "../../../pages/likes/api/get-likes";
import Likes from "../../../pages/likes/likes";

export const likesLoader = (queryClient: QueryClient) => async () => {
  const likesQuery = getLikesQueryOptions();

  return (
    queryClient.getQueryData(likesQuery.queryKey) ??
    (await queryClient.fetchQuery(likesQuery))
  );
};

export const LikesRoute = () => {
  const { data: posts, isLoading } = useLikes();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Head title="Likes" />
      <Likes posts={posts} />
    </>
  );
};
