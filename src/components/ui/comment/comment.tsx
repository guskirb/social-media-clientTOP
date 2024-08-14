import { Link } from "react-router-dom";
import { User, Clock } from "lucide-react";
import { useState } from "react";

import Container from "../container/container";
import ProfileImg from "../profile/profile-img";
import Dropdown from "../dropdown/dropdown";

export default function Comment({ comment }) {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <Container>
      <div className="p-4 flex gap-2 bg-gray-50">
        <Link
          to={`/profile/${comment.author.username}`}
          className="w-[45px] h-[45px]"
        >
          <ProfileImg image={comment.author.profileImg} />
        </Link>
        <div className="flex flex-col gap-2 w-full">
          <div className="flex gap-2 items-center relative">
            <Link
              to={`/profile/${comment.author.username}`}
              className="flex items-center gap-2"
            >
              <p className="font-semibold">
                {comment.author.name || comment.author.username}
              </p>
              <div className="hidden lg:flex items-center gap-1">
                <User size={13} color="#7a7a7a" />
                <p className="text-sm opacity-70">{comment.author.username}</p>
              </div>
            </Link>
            <div className="flex items-center gap-1">
              <Clock size={13} color="#7a7a7a" />
              <p className="text-xs opacity-70">{comment.createdFormatted}</p>
            </div>
            <Dropdown
              showDropdown={showDropdown}
              setShowDropdown={setShowDropdown}
            >
                
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
