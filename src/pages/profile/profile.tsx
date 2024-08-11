import { Users, CalendarDays } from "lucide-react";

import Container from "../../components/ui/container/container";
import ProfileImg from "../../components/ui/profile/profile-img";
import PostList from "../../components/ui/post-list/post-list";
import useAuthStore from "../../hooks/use-auth-store";
import { useState } from "react";
import EditProfile from "../../components/ui/edit-profile/edit-profile";

export default function Profile({ user }) {
  const myUser = useAuthStore((state) => state.user);
  const [showEditModal, setShowEditModal] = useState(false);

  return (
    <>
      <Container>
        <div className="flex flex-col justify-center items-center bg-white relative">
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
            <ProfileImg image={user.ProfileImg} size={100} />
          </div>
          <div className="flex flex-col items-center">
            <p className="text-lg font-semibold">
              {user.name || user.username}
            </p>
            <p className="text-sm opacity-70">{user.username}</p>
          </div>
          <div className="min-h-3">
            <p>{user.bio}</p>
          </div>
          <div className="flex gap-3 pb-4">
            <div className="flex items-center gap-1">
              <Users size={15} color="#7a7a7a" />
              <p>{user.friends.length + " Friends"}</p>
            </div>
            <div className="flex items-center gap-1">
              <CalendarDays size={15} color="#7a7a7a" />
              <p>{user.joinedFormatted}</p>
            </div>
          </div>
          {myUser!.id === user.id && (
            <button
              className="absolute m-3 right-0 top-60"
              onClick={() => setShowEditModal(true)}
            >
              Edit Profile
            </button>
          )}
          {showEditModal && (
            <EditProfile user={user} setShowModal={setShowEditModal} />
          )}
        </div>
      </Container>
      <PostList posts={user.posts} />
    </>
  );
}
