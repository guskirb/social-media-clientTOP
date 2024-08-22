import { Users, CalendarDays, Pencil, LockKeyhole } from "lucide-react";
import { useState } from "react";

import Container from "../../components/ui/container/container";
import ProfileImg from "../../components/ui/profile/profile-img";
import useAuthStore from "../../hooks/use-auth-store";
import EditProfile from "../../components/ui/edit-profile/edit-profile";
import AddFriend from "./add-friend";
import { User } from "../../types/types";
import ProfileFeed from "./profile-feed";
import { urlifyString } from "../../utils/url";
import Friends from "./friends";

export default function Profile({ user }: { user: User }) {
  const myUser = useAuthStore((state) => state.user);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showFriendsModal, setShowFriendsModal] = useState(false);

  return (
    <>
      <Container>
        {showEditModal && (
          <EditProfile user={user} setShowModal={setShowEditModal} />
        )}
        {showFriendsModal && (
          <Friends user={user} setShowFriendsModal={setShowFriendsModal} />
        )}
        <div className="transition-all w-full flex flex-col justify-center items-center bg-white dark:bg-slate-700 dark:text-white relative z-[0] rounded-xl overflow-hidden">
          <img
            src={
              user.coverImg
                ? user.coverImg
                : "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
            }
            alt=""
            className="h-60 object-cover w-full"
          />
          <div className="transition-all border-[6px] border-white dark:border-slate-700 rounded-full mt-[-50px]">
            <ProfileImg image={user.profileImg!} size={100} />
          </div>
          <div className="flex flex-col items-center">
            <p className="text-lg font-semibold">
              {user.name || user.username}
            </p>
            <p className="text-sm opacity-70">{user.username}</p>
          </div>
          <div className="min-h-3">
            <p className="py-3 whitespace-pre-wrap text-center">
              {user.bio ? urlifyString(user.bio) : ""}
            </p>
          </div>
          <div className="flex gap-5 pb-4">
            <div className="flex items-center gap-1">
              <Pencil size={15} className="opacity-70" />
              <p>{user._count!.posts + " Posts"}</p>
            </div>
            <div
              onClick={() => setShowFriendsModal(true)}
              className="flex items-center gap-1 cursor-pointer hover:underline"
            >
              <Users size={15} className="opacity-70" />
              <p>
                {user._count!.friends +
                  (user._count!.friends === 1 ? " Friend" : " Friends")}
              </p>
            </div>
            <div className="flex items-center gap-1">
              <CalendarDays size={15} className="opacity-70" />
              <p>{user.joinedFormatted!}</p>
            </div>
          </div>
          {myUser!.id === user.id ? (
            <button
              className="absolute m-3 right-0 top-60 transition-all border-blue-500 dark:border-blue-600 text-blue-500 dark:text-blue-600 hover:border-blue-600 dark:hover:border-blue-700 hover:text-blue-600 dark:hover:text-blue-700 hover:bg-blue-50 dark:bg-slate-700 dark:hover:bg-slate-700"
              onClick={() => setShowEditModal(true)}
            >
              Edit Profile
            </button>
          ) : (
            <div className="absolute m-3 right-0 top-60">
              <AddFriend myUser={myUser!} user={user} size="normal" />
            </div>
          )}
        </div>
      </Container>
      {user.id === myUser!.id || myUser?.friends.includes(user.id) ? (
        <ProfileFeed user={user} />
      ) : (
        <div className="dark:text-white w-full p-10 flex flex-col gap-3 justify-center items-center">
          <LockKeyhole size={60}  strokeWidth={1.5}/>
          <p className="font-medium">You must be friends to view this profile.</p>
        </div>
      )}
    </>
  );
}
