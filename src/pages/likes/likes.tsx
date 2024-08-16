import { InfiniteData } from "@tanstack/react-query";
import PostList from "../../components/ui/post-list/post-list";
import { Page } from "../../types/types";
import Loader from "../../components/ui/loader/loader";

interface LikesProps {
  posts: InfiniteData<Page, string | null>;
  isLoading: boolean;
  fetchNextPage: any;
  isFetchingNextPage: boolean;
}

export default function Likes({
  posts,
  isLoading,
  fetchNextPage,
  isFetchingNextPage,
}: LikesProps) {
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <PostList
          posts={posts}
          isFetchingNextPage={isFetchingNextPage}
          fetchNextPage={fetchNextPage}
        />
      )}
    </>
  );
}
