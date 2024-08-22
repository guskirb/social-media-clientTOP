import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";

import Post from "../post/post";
import CommentList from "../comment-list/comment-list";
import { Page } from "../../../types/types";
import { InfiniteData } from "@tanstack/react-query";
import Loader from "../loader/loader";
import { useEffect } from "react";
import { PencilOff } from "lucide-react";

interface PostListProps {
  posts: InfiniteData<Page, string | null>;
  isFetchingNextPage: boolean;
  fetchNextPage: any;
}

export default function PostList({
  posts,
  isFetchingNextPage,
  fetchNextPage,
}: PostListProps) {
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  return (
    <>
      {posts.pages[0].posts.length > 0 ? (
        posts!.pages.map((page, index) => {
          return (
            <div key={index}>
              <div className="flex flex-col gap-4">
                {page.posts.map((post) => (
                  <div key={post.id} className="flex flex-col gap-4">
                    <Post post={post} />
                    {post.comments.length > 0 && (
                      <Link to={`/post/${post.id}`}>
                        <CommentList comments={post.comments.slice(0, 1)} />
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })
      ) : (
        <div className="opacity-70 dark:text-white w-full p-10 flex flex-col gap-3 justify-center items-center">
          <PencilOff size={60} strokeWidth={1.5} />
          <p className="font-medium">No posts to display.</p>
        </div>
      )}
      <div ref={ref}>
        {isFetchingNextPage && (
          <div className="h-[100px]">
            <Loader />
          </div>
        )}
      </div>
    </>
  );
}
