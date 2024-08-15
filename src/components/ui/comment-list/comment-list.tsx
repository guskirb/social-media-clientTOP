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
        <div className="w-full flex justify-center items-center p-5">
          <p className="text-lg font-normal">No comments to display</p>
        </div>
      )}
    </div>
  );
}
