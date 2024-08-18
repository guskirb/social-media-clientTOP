import { Users, CalendarDays, Pencil } from "lucide-react";
import { useState } from "react";

import Container from "../../components/ui/container/container";
import ProfileImg from "../../components/ui/profile/profile-img";
import useAuthStore from "../../hooks/use-auth-store";
import EditProfile from "../../components/ui/edit-profile/edit-profile";
import AddFriend from "./add-friend";
import { User } from "../../types/types";
import ProfileFeed from "./profile-feed";

export default function Profile({ user }: { user: User }) {
  const myUser = useAuthStore((state) => state.user);
  const [showEditModal, setShowEditModal] = useState(false);

  return (
    <>
      <Container>
        {showEditModal && (
          <EditProfile user={user} setShowModal={setShowEditModal} />
        )}
        <div className="flex flex-col justify-center items-center bg-white relative z-[0] rounded-xl overflow-hidden">
          <img
            src={
              user.coverImg
                ? user.coverImg
                : "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
            }
            alt=""
            className="h-60 object-cover w-full"
          />
          <div className="border-[6px] border-white rounded-full mt-[-50px]">
            <ProfileImg image={user.profileImg!} size={100} />
          </div>
          <div className="flex flex-col items-center">
            <p className="text-lg font-semibold">
              {user.name || user.username}
            </p>
            <p className="text-sm opacity-70">{user.username}</p>
          </div>
          <div className="min-h-3">
            <p className="py-3 whitespace-pre-wrap">{user.bio}</p>
          </div>
          <div className="flex gap-5 pb-4">
            <div className="flex items-center gap-1">
              <Pencil size={15} color="#7a7a7a" />
              <p>{user._count!.posts + " Posts"}</p>
            </div>
            <div className="flex items-center gap-1">
              <Users size={15} color="#7a7a7a" />
              <p>{user._count!.friends + " Friends"}</p>
            </div>
            <div className="flex items-center gap-1">
              <CalendarDays size={15} color="#7a7a7a" />
              <p>{user.joinedFormatted!}</p>
            </div>
          </div>
          {myUser!.id === user.id ? (
            <button
              className="absolute m-3 right-0 top-60"
              onClick={() => setShowEditModal(true)}
            >
              Edit Profile
            </button>
          ) : (
            <AddFriend myUser={myUser!} user={user} />
          )}
        </div>
      </Container>
      {user.id === myUser!.id || myUser?.friends.includes(user.id) ? (
        <ProfileFeed user={user} />
      ) : (
        <div>You Must be friends to view profile</div>
      )}
    </>
  );
}
