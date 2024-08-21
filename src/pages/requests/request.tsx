import { Link } from "react-router-dom";
import { User } from "lucide-react";

import Container from "../../components/ui/container/container";
import ProfileImg from "../../components/ui/profile/profile-img";
import { Request as RequestType } from "../../types/types";
import { useAcceptRequest, useDeclineRequest } from "./api/response";

export default function Request({ request }: { request: RequestType }) {
  const { mutate: acceptRequest } = useAcceptRequest();
  const { mutate: declineRequest } = useDeclineRequest();

  const onClickAccept = () => {
    acceptRequest(request.from.id);
  };

  const onClickDecline = () => {
    declineRequest(request.from.id);
  };

  return (
    <Container>
      <div className="p-4 flex gap-3 bg-white dark:bg-slate-700 dark:text-white rounded-xl items-center">
        <Link
          to={`/profile/${request.from!.username}`}
          className="min-w-[60px] min-h-[60px]"
        >
          <ProfileImg image={request.from.profileImg!} size={60} />
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
                <User size={13} className="opacity-70" />
                <p className="text-sm opacity-70">{request.from.username}</p>
              </div>
            </Link>
            <p className="ml-auto text-xs opacity-70">
              {request.sentFormatted}
            </p>
          </div>
          <div className="flex gap-3">
            <button className="w-full text-white bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700" onClick={onClickAccept}>
              Accept
            </button>
            <button className="w-full text-red-500 border-red-500 bg-white dark:bg-slate-700 hover:text-white hover:bg-red-500" onClick={onClickDecline}>
              Decline
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
}
