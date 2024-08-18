import { User } from "../../types/types";
import { useCancelRequest } from "../requests/api/cancel-request";
import { useAcceptRequest } from "../requests/api/response";
import { useRemoveFriend } from "./api/remove-friend";
import { useSendRequest } from "./api/send-friend-request";

interface AddFriendProps {
  myUser: User;
  user: User;
}

export default function AddFriend({ myUser, user }: AddFriendProps) {
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
        onClick={() => {
          cancelRequest(user.id);
        }}
        className="absolute m-3 right-0 top-60"
      >
        Cancel Request
      </button>
    );
  }

  if (myUser.requests?.includes(user.id)) {
    <button
      onClick={() => {
        acceptRequest(user.id);
      }}
      className="absolute m-3 right-0 top-60"
    >
      Accept Request
    </button>;
  }

  if (myUser?.friends!.includes(user.id)) {
    return (
      <button
        onClick={() => {
          removeFriend(user.id);
        }}
        className="absolute m-3 right-0 top-60"
      >
        Remove Friend
      </button>
    );
  }
  return (
    <>
      <button
        onClick={() => {
          sendRequest(user.id);
        }}
        className="absolute m-3 right-0 top-60"
      >
        Add Friend
      </button>
    </>
  );
}
