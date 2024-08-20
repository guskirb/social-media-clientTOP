import { useNavigate } from "react-router-dom";
import { User, Clock } from "lucide-react";
import { useState } from "react";

import Container from "../container/container";
import ProfileImg from "../profile/profile-img";
import Dropdown from "../dropdown/dropdown";
import CommentSettings from "./comment-settings";
import useAuthStore from "../../../hooks/use-auth-store";
import { Comment as CommentType } from "../../../types/types";

export default function Comment({ comment }: { comment: CommentType }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  return (
    <Container>
      <div className="transition-all flex p-4 gap-2 bg-white rounded-xl hover:shadow hover:scale-[1.01]">
        <div
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            navigate(`/profile/${comment.author.username}`);
          }}
          className="min-w-[45px] h-[45px] cursor-pointer"
        >
          <ProfileImg image={comment.author.profileImg!} />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <div className="flex gap-2 items-center relative">
            <div
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                navigate(`/profile/${comment.author.username}`);
              }}
              className="flex items-center gap-2 cursor-pointer"
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
            <p className="whitespace-pre-line break-words lg:w-[495px]">{comment.comment}</p>
            {comment.commentImg && (
              <img src={comment.commentImg} className="rounded-xl w-full" />
            )}
          </div>
        </div>
      </div>
    </Container>
  );
}
