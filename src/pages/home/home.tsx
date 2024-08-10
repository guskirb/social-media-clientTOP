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

export default function Home({ posts, refetch }) {
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
        user={user}
        register={register}
        name="post"
        placeholder="What's on your mind?"
        resetField={resetField}
      />
      <PostList posts={posts} />
    </>
  );
}
