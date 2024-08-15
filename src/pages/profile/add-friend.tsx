import { User } from "../../types/types";
import { useSendRequest } from "./api/send-friend-request";

interface AddFriendProps {
  myUser: User;
  user: User;
}

export default function AddFriend({ myUser, user }: AddFriendProps) {
  const { mutate: sendRequest } = useSendRequest();

  const onClickSendRequest = () => {
    sendRequest(user.id);
  };

  if (myUser.id === user.id) {
    return null;
  }

  if (myUser.outgoingRequests!.includes(user.id)) {
    return (
      <button
        onClick={onClickSendRequest}
        className="absolute m-3 right-0 top-60"
        disabled
      >
        Request Sent
      </button>
    );
  }

  if (!myUser?.friends!.includes(user.id)) {
    return (
      <button
        onClick={onClickSendRequest}
        className="absolute m-3 right-0 top-60"
      >
        Add Friend
      </button>
    );
  }
  return (
    <>
      <button
        onClick={onClickSendRequest}
        className="absolute m-3 right-0 top-60"
      >
        Add Friend
      </button>
    </>
  );
}
