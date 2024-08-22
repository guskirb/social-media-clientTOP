import { MessageSquareDashed } from "lucide-react";
import { Comment as CommentType } from "../../../types/types";
import Comment from "../comment/comment";

export default function CommentList({
  comments,
}: {
  comments: Array<CommentType>;
}) {
  return (
    <div className="flex flex-col gap-3">
      {comments.length !== 0 ? (
        comments.map((comment) => (
          <div className="ml-10" key={comment.id}>
            <Comment comment={comment} />
          </div>
        ))
      ) : (
        <div className="opacity-70 dark:text-white w-full p-10 flex flex-col gap-3 justify-center items-center">
          <MessageSquareDashed size={60} strokeWidth={1.5} />
          <p className="font-medium">No comments to display.</p>
        </div>
      )}
    </div>
  );
}
