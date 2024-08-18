import { InfiniteData } from "@tanstack/react-query";
import Loader from "../../components/ui/loader/loader";
import PostList from "../../components/ui/post-list/post-list";
import { useUserPosts } from "./api/get-user-posts";
import { Page, User } from "../../types/types";

export default function ProfilePosts({ user }: { user: User }) {
  const {
    data: posts,
    isLoading: postsLoading,
    fetchNextPage: postsFetch,
    isFetchingNextPage: postsFetching,
  } = useUserPosts(user!.username);

  return (
    <>
      {postsLoading ? (
        <Loader />
      ) : (
        <PostList
          posts={posts as InfiniteData<Page, string | null>}
          fetchNextPage={postsFetch}
          isFetchingNextPage={postsFetching}
        />
      )}
    </>
  );
}
