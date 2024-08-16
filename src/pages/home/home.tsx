import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

import PostList from "../../components/ui/post-list/post-list";
import PostForm from "../../components/ui/post-form/post-form";
import useAuthStore from "../../hooks/use-auth-store";
import {
  useCreatePost,
  CreatePostFormFields,
  createPostSchema,
} from "./api/create-post";
import { Post } from "../../types/types";
import Loader from "../../components/ui/loader/loader";

interface HomeProps {
  posts:
    | Array<{
        success: boolean;
        posts: Array<Post>;
        nextPage: number | null;
      }>
    | undefined;
  isLoading: boolean;
  fetchNextPage: any;
  isFetchingNextPage: boolean;
}

export default function Home({
  posts,
  isLoading,
  fetchNextPage,
  isFetchingNextPage,
}: HomeProps) {
  const {
    register,
    handleSubmit,
    resetField,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreatePostFormFields>({
    resolver: zodResolver(createPostSchema),
  });
  const { mutate: createPost } = useCreatePost();
  const user = useAuthStore((state) => state.user);
  const { ref, inView } = useInView();

  const onSubmit: SubmitHandler<CreatePostFormFields> = async (data) => {
    try {
      const formData = new FormData();
      if (data.post) {
        formData.append("post", data.post);
      }
      if (data.image) {
        formData.append("image", data.image[0]);
      }
      createPost(formData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  return (
    <>
      <PostForm
        onSubmit={handleSubmit(onSubmit)}
        user={user!}
        register={register}
        name="post"
        placeholder="What's on your mind?"
        resetField={resetField}
      />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {posts!.map((page, index) => {
            return (
              <div key={index}>
                <PostList posts={page.posts} />
              </div>
            );
          })}
          <div ref={ref}>
            {isFetchingNextPage && (
              <div className="h-[100px]">
                <Loader />
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}
