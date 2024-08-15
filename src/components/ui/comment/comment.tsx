import { Link, useNavigate } from "react-router-dom";
import { User, Clock } from "lucide-react";
import { useState } from "react";

import Container from "../container/container";
import ProfileImg from "../profile/profile-img";
import Dropdown from "../dropdown/dropdown";
import CommentSettings from "./comment-settings";
import useAuthStore from "../../../hooks/use-auth-store";

export default function Comment({ comment }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  return (
    <Container>
      <div className="p-4 flex gap-2 bg-white">
        <div
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            navigate(`/profile/${comment.author.username}`);
          }}
          className="w-[45px] h-[45px]"
        >
          <ProfileImg image={comment.author.profileImg} />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <div className="flex gap-2 items-center relative">
            <div
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                navigate(`/profile/${comment.author.username}`);
              }}
              className="flex items-center gap-2"
            >
              <p className="font-semibold">
                {comment.author.name || comment.author.username}
              </p>
              <div className="hidden lg:flex items-center gap-1">
                <User size={13} color="#7a7a7a" />
                <p className="text-sm opacity-70">{comment.author.username}</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Clock size={13} color="#7a7a7a" />
              <p className="text-xs opacity-70">{comment.createdFormatted}</p>
            </div>
            <Dropdown
              showDropdown={showDropdown}
              setShowDropdown={setShowDropdown}
            >
              <CommentSettings
                user={user}
                comment={comment}
                setShowDropdown={setShowDropdown}
              />
            </Dropdown>
          </div>
          <div className="mt-[-5px] flex flex-col gap-1">
            <p className="whitespace-pre-wrap">{comment.comment}</p>
            {comment.postImg && (
              <img src={comment.postImg} className="rounded-xl w-full" />
            )}
          </div>
        </div>
      </div>
    </Container>
  );
}
