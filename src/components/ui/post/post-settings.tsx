import { Trash2 } from "lucide-react";

import { useDeletePost } from "./api/delete-post";
import { Post, User } from "../../../types/types";

interface PostSettingsProps {
  user: User;
  post: Post;
  setShowDropdown: (showDropdown: boolean) => void;
}

export default function PostSettings({
  user,
  post,
  setShowDropdown,
}: PostSettingsProps) {
  const { mutate: deletePost } = useDeletePost();

  return (
    <>
      <ul>
        {post.authorId === user.id && (
          <li
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => {
              deletePost(post.id);
              setShowDropdown(false);
            }}
          >
            <Trash2 size={15} strokeWidth={2.5} color="#fc8181" />
            <p className="text-red-400 text-sm font-semibold">Delete Post</p>
          </li>
        )}
      </ul>
    </>
  );
}
