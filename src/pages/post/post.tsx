import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import PostForm from "../../components/ui/post-form/post-form";
import Post from "../../components/ui/post/post";
import useAuthStore from "../../hooks/use-auth-store";
import {
  CreateCommentFormFields,
  createCommentSchema,
} from "./api/create-comment";

export default function PostPage({ post }) {
  const {
    register,
    handleSubmit,
    resetField,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateCommentFormFields>({
    resolver: zodResolver(createCommentSchema),
  });
  const user = useAuthStore((state) => state.user);

  const onSubmit: SubmitHandler<CreateCommentFormFields> = async (data) => {
    console.log(data);
  };

  return (
    <>
      <Post post={post} />
      <PostForm
        onSubmit={handleSubmit(onSubmit)}
        user={user}
        register={register}
        name="comment"
        placeholder="Post a comment"
        resetField={resetField}
      />
    </>
  );
}
