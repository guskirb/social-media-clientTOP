import Container from "../container/container";
import { Link, useNavigate } from "react-router-dom";
import { MessageSquare, Clock, User } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import ProfileImg from "../profile/profile-img";
import useAuthStore from "../../../hooks/use-auth-store";
import LikeButton from "./like-button";
import Dropdown from "../dropdown/dropdown";
import PostSettings from "./post-settings";
import { Post as PostType } from "../../../types/types";
import { urlifyString } from "../../../utils/url";
import VideoPlayer from "./video-player";
import PostLikes from "./post-likes";

export default function Post({ post }: { post: PostType }) {
  const [currPost, setCurrPost] = useState(post);
  const postText = currPost.post
    ? useMemo(() => urlifyString(currPost.post as string), [currPost.post])
    : "";
  const user = useAuthStore((state) => state.user);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showLikes, setShowLikes] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setCurrPost(post);
  }, [post]);

  return (
    <Container>
      {showLikes && <PostLikes post={post} setShowLikes={setShowLikes} />}
      <Link to={`/post/${post.id}`}>
        <div className="transition-all p-4 flex gap-2 bg-white rounded-xl hover:shadow hover:scale-[1.01]">
          <div
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              navigate(`/profile/${currPost.author!.username}`);
            }}
            className="cursor-pointer w-[45px] h-[45px]"
          >
            <ProfileImg image={currPost.author!.profileImg!} />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <div className="flex gap-2 items-center relative">
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  navigate(`/profile/${currPost.author!.username}`);
                }}
                className="flex items-center gap-2 cursor-pointer"
              >
                <p className="font-semibold">
                  {currPost.author!.name || currPost.author!.username}
                </p>
                <div className="flex items-center gap-1">
                  <User size={13} color="#7a7a7a" />
                  <p className="text-sm opacity-70">
                    {currPost.author!.username}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Clock size={13} color="#7a7a7a" />
                <p className="text-xs opacity-70">
                  {currPost.createdFormatted}
                </p>
              </div>
              <Dropdown
                showDropdown={showDropdown}
                setShowDropdown={setShowDropdown}
              >
                <PostSettings
                  user={user!}
                  post={currPost}
                  setShowDropdown={setShowDropdown}
                />
              </Dropdown>
            </div>
            <div className="mt-[-5px] flex flex-col gap-1">
              <div className="whitespace-pre-wrap break-words">{postText}</div>
              {currPost.postImg ? (
                <img src={currPost.postImg} className="rounded-xl w-full" />
              ) : null}
              <VideoPlayer post={post} />
            </div>
            <div className="flex gap-5 justify-between  pt-2">
              <div className="flex items-center gap-1">
                <MessageSquare size={17} color="#7a7a7a" />
                <p className="text-sm opacity-70">
                  {currPost.comments.length +
                    (currPost.comments.length === 1 ? " Comment" : " Comments")}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <LikeButton post={currPost} setCurrPost={setCurrPost} />
                <p
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setShowLikes(true);
                  }}
                  className="text-sm opacity-70 hover:underline"
                >
                  {currPost.likedBy?.length +
                    (currPost.likedBy?.length === 1 ? " Like" : " Likes")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </Container>
  );
}
