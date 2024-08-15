import { Trash2 } from "lucide-react";

import { useDeleteComment } from "./api/delete-comment";

type CommentSettingsProps = {
  user: any;
  comment: any;
  setShowDropdown: any;
};

export default function CommentSettings({
  user,
  comment,
  setShowDropdown,
}: CommentSettingsProps) {
  const { mutate: deleteComment } = useDeleteComment();

  return (
    <>
      <ul>
        {comment.authorId === user.id && (
          <li
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => {
              deleteComment(comment);
              setShowDropdown(false);
            }}
          >
            <Trash2 size={15} strokeWidth={2.5} color="#fc8181" />
            <p className="text-red-400 text-sm font-semibold">Delete Comment</p>
          </li>
        )}
      </ul>
    </>
  );
}
