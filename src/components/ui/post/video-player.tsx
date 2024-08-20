import ReactPlayer from "react-player";

import { Post } from "../../../types/types";
import { getLink } from "../../../utils/get-link";

export default function VideoPlayer({ post }: { post: Post }) {
  let videoLink = getLink(post.post!);

  if (post.postImg) {
    return null;
  }

  return (
    <>
      {videoLink ? (
        <div className="player-wrapper w-auto h-auto">
          <ReactPlayer url={videoLink as string} />
        </div>
      ) : null}
    </>
  );
}
