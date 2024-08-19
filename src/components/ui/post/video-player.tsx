import ReactPlayer from "react-player";

import { Post } from "../../../types/types";
import { getLink } from "../../../utils/get-link";

export default function VideoPlayer({ post }: { post: Post }) {
  if (post.postImg) {
    return null;
  }

  return (
    <>
      {getLink(post.post!) ? (
        <div className="player-wrapper w-auto h-auto">
          <ReactPlayer url={getLink(post.post!) as string} />
        </div>
      ) : null}
    </>
  );
}
