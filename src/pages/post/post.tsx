import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

import PostForm from "../../components/ui/post-form/post-form";
import Post from "../../components/ui/post/post";
import useAuthStore from "../../hooks/use-auth-store";
import {
  CreateCommentFormFields,
  createCommentSchema,
  useCreateComment,
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
  const { mutate: createComment } = useCreateComment();

  const onSubmit: SubmitHandler<CreateCommentFormFields> = async (data) => {
    try {
      const formData = new FormData();
      if (data.comment) {
        formData.append("comment", data.comment);
      }
      if (data.image) {
        formData.append("image", data.image[0]);
      }
      createComment({ data: formData, id: post.id });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="flex items-center gap-5">
        <Link to={"/home"}>
          <ArrowLeft />
        </Link>
        <p className="text-xl">Post</p>
      </div>
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
