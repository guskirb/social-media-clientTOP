import { ReactNode, useState } from "react";
import {
  House,
  ThumbsUp,
  User,
  Bell,
  BellDot,
  Pencil,
  Share2,
} from "lucide-react";
import { Link, NavLink } from "react-router-dom";
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
import RecentUsers from "../ui/recent-users/recent-users";
import DarkMode from "./dark-mode/dark-mode";

export default function Layout({ children }: { children: ReactNode }) {
  const {
    register,
    handleSubmit,
    resetField,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
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

  return (
    <div className="transition-all flex justify-center bg-gray-100 dark:bg-slate-800 min-h-full">
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
            isSubmitting={isSubmitting}
          />
        </Modal>
      )}
      <div className="flex flex-col items-end min-w-[60px] lg:w-full">
        <div className="fixed flex flex-col gap-3 px-3 py-4 lg:py-4 lg:px-8 h-full items-center lg:items-start">
          <Link
            to={"/home"}
            className="transition-all text-blue-500 dark:text-white mb-4"
          >
            <Share2 size={40} />
          </Link>
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  "dark:text-white flex gap-3 font-medium items-center w-fit justify-start transition-all rounded-xl bg-gray-100 dark:bg-slate-800 p-2 hover:bg-white dark:hover:bg-slate-700 lg:px-4 hover:shadow-sm opacity-70 hover:opacity-100",
                  isActive && "bg-white dark:bg-slate-700 shadow-sm opacity-1"
                )
              }
            >
              <item.icon className="" aria-hidden="true" />
              <p className="text-xl hidden lg:block">{item.name}</p>
            </NavLink>
          ))}
          <div
            className="w-full flex font-medium items-center justify-center transition-all duration-200 rounded-xl p-2 bg-blue-500 dark:bg-blue-600 lg:pr-3 cursor-pointer mt-5 hover:bg-blue-600 dark:hover:bg-blue-700 shadow"
            onClick={() => setShowPostModal(true)}
          >
            <Pencil color="#ffffff" className="lg:hidden block" />
            <p className="text-xl hidden lg:block text-white">Post</p>
          </div>
          <ProfileMenu user={user!} />
        </div>
      </div>
      <main className="w-[90%] sm:w-full lg:min-w-[600px] py-4 pr-4 lg:pr-0 flex flex-col gap-4">
        {children}
      </main>
      <div className="hidden lg:block lg:w-full">
        <div className="fixed w-[320px] flex flex-col gap-3 px-5 py-4 lg:px-8 h-full items-center lg:items-start">
          <SearchBar />
          <RecentUsers />
        </div>
      </div>
      <div className="hidden lg:block fixed lg:left-auto lg:right-14 lg:bottom-14">
        <DarkMode />
      </div>
    </div>
  );
}
