import { InfiniteData } from "@tanstack/react-query";

import Loader from "../../components/ui/loader/loader";
import PostList from "../../components/ui/post-list/post-list";
import { useSearchPosts } from "./api/search-posts";
import { Page } from "../../types/types";

export default function SearchPosts({ params }: { params: string }) {
  const {
    data: posts,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
  } = useSearchPosts(params);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <PostList
          posts={posts as InfiniteData<Page, string | null>}
          fetchNextPage={fetchNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      )}
    </>
  );
}
