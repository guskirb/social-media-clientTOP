import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import PostList from "../../components/ui/post-list/post-list";
import PostForm from "../../components/ui/post-form/post-form";
import useAuthStore from "../../hooks/use-auth-store";
import {
  useCreatePost,
  CreatePostFormFields,
  createPostSchema,
} from "./api/create-post";
import { Page } from "../../types/types";
import Loader from "../../components/ui/loader/loader";
import { InfiniteData } from "@tanstack/react-query";
import { useEffect } from "react";

interface HomeProps {
  posts: InfiniteData<Page, string | null>;
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
    formState: { errors, isSubmitSuccessful},
  } = useForm<CreatePostFormFields>({
    resolver: zodResolver(createPostSchema),
  });
  const { mutate: createPost } = useCreatePost();
  const user = useAuthStore((state) => state.user);

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

  return (
    <>
      <PostForm
        onSubmit={handleSubmit(onSubmit)}
        user={user!}
        register={register}
        name="post"
        placeholder="What's on your mind?"
        resetField={resetField}
        errors={errors}
        isSubmitSuccessful={isSubmitSuccessful}
        reset={reset}
      />
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
