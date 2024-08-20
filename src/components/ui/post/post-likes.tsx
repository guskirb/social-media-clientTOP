import { Post } from "../../../types/types";
import Modal from "../modal/modal";
import UserList from "../user-list/user-list";

interface PostLikesProps {
  post: Post;
  setShowLikes: (value: boolean) => void;
}

export default function PostLikes({ post, setShowLikes }: PostLikesProps) {
  return (
    <Modal title="Liked By" setShowModal={setShowLikes}>
      <div className="pb-3" onClick={() => setShowLikes(false)}>
        <UserList users={post.likedBy!} size="small" />
      </div>
    </Modal>
  );
}
