import Modal from "../../components/ui/modal/modal";
import UserList from "../../components/ui/user-list/user-list";
import { User } from "../../types/types";

interface FriendsProps {
  user: User;
  setShowFriendsModal: (value: boolean) => void;
}

export default function Friends({ user, setShowFriendsModal }: FriendsProps) {
  return (
    <Modal title="Friends" setShowModal={setShowFriendsModal}>
      <div className="pb-3" onClick={() => setShowFriendsModal(false)}>
        <UserList users={user.friends!} size="small" />
      </div>
    </Modal>
  );
}
