import { InfiniteData } from "@tanstack/react-query";
import Loader from "../../components/ui/loader/loader";
import PostList from "../../components/ui/post-list/post-list";
import { useLikes } from "../likes/api/get-likes";
import { Page, User } from "../../types/types";

export default function ProfileLikes({ user }: { user: User }) {
  const {
    data: likes,
    isLoading: likesLoading,
    fetchNextPage: likesFetch,
    isFetchingNextPage: likesFetching,
  } = useLikes(user!.username);

  return (
    <>
      {likesLoading ? (
        <Loader />
      ) : (
        <PostList
          posts={likes as InfiniteData<Page, string | null>}
          fetchNextPage={likesFetch}
          isFetchingNextPage={likesFetching}
        />
      )}
    </>
  );
}
