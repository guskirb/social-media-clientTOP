import { Link } from "react-router-dom";
import { User } from "lucide-react";

import Container from "../../components/ui/container/container";
import ProfileImg from "../../components/ui/profile/profile-img";

export default function Request({ request }) {
  return (
    <Container>
      <div className="p-4 flex gap-3 bg-white rounded-xl items-center">
        <Link
          to={`/profile/${request.from!.username}`}
          className="min-w-[60px] min-h-[60px]"
        >
          <ProfileImg image={request.from.profileImg} size={60} />
        </Link>
        <div className="flex flex-col gap-2 w-full">
          <div className="flex">
            <Link
              to={`/profile/${request.from!.username}`}
              className="flex items-center gap-2 w-fit"
            >
              <p className="font-semibold">
                {request.from.name || request.from.username}
              </p>
              <div className="flex items-center gap-1">
                <User size={13} color="#7a7a7a" />
                <p className="text-sm opacity-70">{request.from.username}</p>
              </div>
            </Link>
            <p className="ml-auto text-xs opacity-70">{request.sentFormatted}</p>
          </div>
          <div className="flex gap-3">
            <button className="w-full">Accept</button>
            <button className="w-full">Decline</button>
          </div>
        </div>
      </div>
    </Container>
  );
}
