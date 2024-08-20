import { UserIcon } from "lucide-react";
import useAuthStore from "../../../hooks/use-auth-store";
import { User } from "../../../types/types";
import ProfileImg from "../profile/profile-img";
import AddFriend from "../../../pages/profile/add-friend";

export default function SmallUser({ user }: { user: User }) {
  const myUser = useAuthStore((state) => state.user);

  return (
    <div className="transition-all flex items-center gap-2 hover:bg-gray-50 px-3 p-1">
      <ProfileImg image={user.profileImg!} />
      <div>
        <p className="font-semibold">{user.name || user.username}</p>
        <div className="flex items-center gap-1">
          <UserIcon size={13} color="#7a7a7a" />
          <p className="text-sm opacity-70">{user.username}</p>
        </div>
      </div>
      <div className="ml-auto">
        <AddFriend myUser={myUser!} user={user} size="small" />
      </div>
    </div>
  );
}
