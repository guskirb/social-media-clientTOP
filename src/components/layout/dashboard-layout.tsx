import { ReactNode, useEffect, useState } from "react";
import {
  House,
  ThumbsUp,
  User,
  Bell,
  BellDot,
  Search,
  Pencil,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

import { cn } from "../../utils/cn";
import useAuthStore from "../../hooks/use-auth-store";
import Progress from "../ui/loader/progress";
import Modal from "../ui/modal/modal";
import PostForm from "../ui/post-form/post-form";
import {
  CreatePostFormFields,
  createPostSchema,
  useCreatePost,
} from "../../pages/home/api/create-post";
import ProfileMenu from "../ui/profile-menu/profile-menu";
import SearchBar from "../ui/search-bar/search-bar";

export default function Layout({ children }: { children: ReactNode }) {
  const {
    register,
    handleSubmit,
    resetField,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<CreatePostFormFields>({
    resolver: zodResolver(createPostSchema),
  });
  const user = useAuthStore((state) => state.user);
  const [showPostModal, setShowPostModal] = useState(false);
  const { mutate: createPost } = useCreatePost();
  const navigation = [
    { name: "Home", to: "/home", icon: House },
    {
      name: "Requests",
      to: "requests",
      icon: user!.requests.length === 0 ? Bell : BellDot,
    },
    { name: "Likes", to: "/likes", icon: ThumbsUp },
    { name: "Profile", to: `/profile/${user!.username}`, icon: User },
  ];

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
      reset();
      setShowPostModal(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <div className="flex justify-center bg-gray-100 min-h-full">
      <Progress />
      {showPostModal && (
        <Modal title={"Post"} setShowModal={setShowPostModal}>
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
        </Modal>
      )}
      <div className="flex flex-col items-end min-w-[80px] lg:w-full">
        <div className="fixed flex flex-col gap-3 px-5 py-4 lg:px-8 h-full items-center lg:items-start">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  "flex gap-3 font-medium items-center w-fit justify-start transition-all duration-200 rounded-xl bg-gray-100 p-2 hover:bg-white lg:pr-3 hover:shadow-sm opacity-70 hover:opacity-100",
                  isActive && "bg-white shadow-sm opacity-1"
                )
              }
            >
              <item.icon className="" aria-hidden="true" />
              <p className="text-xl hidden lg:block">{item.name}</p>
            </NavLink>
          ))}
          <div
            className="w-full flex font-medium items-center justify-center transition-all duration-200 rounded-xl p-2 bg-blue-500 lg:pr-3 cursor-pointer mt-5"
            onClick={() => setShowPostModal(true)}
          >
            <Pencil color="#ffffff" className="lg:hidden block" />
            <p className="text-xl hidden lg:block text-white">Post</p>
          </div>
          <ProfileMenu user={user!} />
        </div>
      </div>
      <main className="w-full lg:min-w-[600px] py-4 pr-4 lg:pr-0 flex flex-col gap-4">
        {children}
      </main>
      <div className="hidden lg:block lg:w-full">
        <SearchBar />
      </div>
    </div>
  );
}
