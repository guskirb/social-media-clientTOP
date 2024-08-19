import { User as UserIcon } from "lucide-react";

import useAuthStore from "../../../hooks/use-auth-store";
import AddFriend from "../../../pages/profile/add-friend";
import { User as UserType } from "../../../types/types";
import Container from "../container/container";
import ProfileImg from "../profile/profile-img";

export default function User({ user }: { user: UserType }) {
  const myUser = useAuthStore((state) => state.user);
  return (
    <Container>
      <div className="p-4 flex gap-3 bg-white rounded-xl">
        <ProfileImg image={user.profileImg!} />
        <div className="flex flex-col gap-1 w-full">
          <div className="flex justify-between w-full">
            <div>
              <p className="font-semibold">{user.name || user.username}</p>
              <div className="flex items-center gap-1">
                <UserIcon size={13} color="#7a7a7a" />
                <p className="text-sm opacity-70">{user.username}</p>
              </div>
            </div>
            <div>
              <AddFriend myUser={myUser!} user={user} />
            </div>
          </div>
          <div>
            <p className="whitespace-pre-line">{user.bio}</p>
          </div>
        </div>
      </div>
    </Container>
  );
}
