import { UserCheck, UserMinus, UserPlus, UserX } from "lucide-react";
import { UserObject } from "../../hooks/use-auth-store";
import { User } from "../../types/types";
import { useCancelRequest } from "../requests/api/cancel-request";
import { useAcceptRequest } from "../requests/api/response";
import { useRemoveFriend } from "./api/remove-friend";
import { useSendRequest } from "./api/send-friend-request";

interface AddFriendProps {
  myUser: UserObject;
  user: User;
  size: string;
}

export default function AddFriend({
  myUser,
  user,
  size = "normal",
}: AddFriendProps) {
  const { mutate: sendRequest } = useSendRequest();
  const { mutate: cancelRequest } = useCancelRequest();
  const { mutate: acceptRequest } = useAcceptRequest();
  const { mutate: removeFriend } = useRemoveFriend();

  if (myUser.id === user.id) {
    return null;
  }

  if (myUser.outgoingRequests!.includes(user.id)) {
    return (
      <button
        className="transition-all border-blue-500 text-blue-500 hover:border-red-500 hover:text-red-500 hover:bg-red-50"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          cancelRequest(user.id);
        }}
      >
        {size === "normal" ? (
          <div className="flex items-center gap-2">
            <UserX size={20} />
            <p>Cancel Request</p>
          </div>
        ) : (
          <UserX size={20} />
        )}
      </button>
    );
  }

  if (myUser.requests!.includes(user.id)) {
    return (
      <button
        className="transition-all bg-emerald-500 text-white hover:bg-emerald-600"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          acceptRequest(user.id);
        }}
      >
        {size === "normal" ? (
          <div className="flex items-center gap-2">
            <UserCheck size={20} />
            <p>Accept Request</p>
          </div>
        ) : (
          <UserCheck size={20} />
        )}
      </button>
    );
  }

  if (myUser?.friends!.includes(user.id)) {
    return (
      <button
        className="transition-all border-blue-500 text-blue-500 hover:border-red-500 hover:text-red-500 hover:bg-red-50"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          removeFriend(user.id);
        }}
      >
        {size === "normal" ? (
          <div className="flex items-center gap-2">
            <UserMinus size={20} />
            <p>Remove Friend</p>
          </div>
        ) : (
          <UserMinus size={20} />
        )}
      </button>
    );
  }
  return (
    <>
      <button
        className="transition-all bg-blue-500 text-white hover:bg-blue-600"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          sendRequest(user.id);
        }}
      >
        {size === "normal" ? (
          <div className="flex items-center gap-2">
            <UserPlus size={20} />
            <p className="text-white">Add Friend</p>
          </div>
        ) : (
          <UserPlus size={20} />
        )}
      </button>
    </>
  );
}
