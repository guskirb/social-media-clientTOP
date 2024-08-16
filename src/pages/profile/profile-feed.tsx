import { useState } from "react";
import { cn } from "../../utils/cn";
import { useLikes } from "../likes/api/get-likes";
import { Page, User } from "../../types/types";
import PostList from "../../components/ui/post-list/post-list";
import Loader from "../../components/ui/loader/loader";
import { InfiniteData } from "@tanstack/react-query";
import { useUserPosts } from "./api/get-user-posts";

export default function ProfileFeed({ user }: { user: User }) {
  const [showing, setShowing] = useState("posts");
  const {
    data: likes,
    isLoading: likesLoading,
    fetchNextPage: likesFetch,
    isFetchingNextPage: likesFetching,
  } = useLikes(user!.username);
  const {
    data: posts,
    isLoading: postsLoading,
    fetchNextPage: postsFetch,
    isFetchingNextPage: postsFetching,
  } = useUserPosts(user!.username);

  return (
    <>
      <div className="w-full flex gap-1 bg-white p-1 rounded-xl">
        <div
          onClick={() => setShowing("posts")}
          className={cn(
            "w-full font-medium p-3 flex justify-center cursor-pointer rounded-xl transition-all opacity-50",
            showing === "posts" && "bg-gray-100 opacity-100"
          )}
        >
          Posts
        </div>
        <div
          onClick={() => setShowing("likes")}
          className={cn(
            "w-full font-medium p-3 flex justify-center cursor-pointer rounded-xl transition-all opacity-50",
            showing === "likes" && "bg-gray-100 opacity-100"
          )}
        >
          Likes
        </div>
      </div>
      {showing === "posts" ? (
        postsLoading ? (
          <Loader />
        ) : (
          <PostList
            posts={posts as InfiniteData<Page, string | null>}
            fetchNextPage={postsFetch}
            isFetchingNextPage={postsFetching}
          />
        )
      ) : likesLoading ? (
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
