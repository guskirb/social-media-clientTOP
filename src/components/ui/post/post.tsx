import Container from "../container/container";
import { Link, useNavigate } from "react-router-dom";
import { MessageSquare, Clock, User } from "lucide-react";

import ProfileImg from "../profile/profile-img";
import { useEffect, useState } from "react";
import useAuthStore from "../../../hooks/use-auth-store";
import LikeButton from "./like-button";
import Dropdown from "../dropdown/dropdown";
import PostSettings from "./post-settings";

export default function Post({ post }) {
  const [currPost, setCurrPost] = useState(post);
  const user = useAuthStore((state) => state.user);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setCurrPost(post);
  }, [post]);

  return (
    <Container>
      <div className="p-4 flex gap-2 bg-white">
        <div
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            navigate(`/profile/${currPost.author.username}`);
          }}
          className="cursor-pointer w-[45px] h-[45px]"
        >
          <ProfileImg image={currPost.author.profileImg} />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <div className="flex gap-2 items-center relative">
            <div
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                navigate(`/profile/${currPost.author.username}`);
              }}
              className="flex items-center gap-2 cursor-pointer"
            >
              <p className="font-semibold">
                {currPost.author.name || currPost.author.username}
              </p>
              <div className="flex items-center gap-1">
                <User size={13} color="#7a7a7a" />
                <p className="text-sm opacity-70">{currPost.author.username}</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Clock size={13} color="#7a7a7a" />
              <p className="text-xs opacity-70">{currPost.createdFormatted}</p>
            </div>
            <Dropdown
              showDropdown={showDropdown}
              setShowDropdown={setShowDropdown}
            >
              <PostSettings
                user={user}
                post={currPost}
                setShowDropdown={setShowDropdown}
              />
            </Dropdown>
          </div>
          <div className="mt-[-5px] flex flex-col gap-1">
            <p className="whitespace-pre-wrap">{currPost.post}</p>
            {currPost.postImg && (
              <img src={currPost.postImg} className="rounded-xl w-full" />
            )}
          </div>
          <div className="flex gap-5 justify-between  pt-2">
            <div className="flex items-center gap-1">
              <MessageSquare size={17} color="#7a7a7a" />
              <p className="text-sm opacity-70">{currPost.comments.length}</p>
            </div>
            <div className="flex items-center gap-1">
              <LikeButton post={currPost} setCurrPost={setCurrPost} />
              <p className="text-sm opacity-70">{currPost.likedBy?.length}</p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
