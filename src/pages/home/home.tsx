import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import PostList from "../../components/ui/post-list/post-list";
import PostForm from "../../components/ui/post-form/post-form";
import useAuthStore from "../../hooks/use-auth-store";
import { CreatePostFormFields, createPostSchema } from "./api/create-post";

export default function Home({ posts }) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<CreatePostFormFields>({
    resolver: zodResolver(createPostSchema),
  });
  const user = useAuthStore((state) => state.user);

  const onSubmit: SubmitHandler<CreatePostFormFields> = async (data) => {
    console.log(data);
  };

  return (
    <>
      <PostForm
        onSubmit={handleSubmit(onSubmit)}
        user={user}
        register={register}
        name="post"
        placeholder="What's on your mind?"
      />
      <PostList posts={posts} />
    </>
  );
}
