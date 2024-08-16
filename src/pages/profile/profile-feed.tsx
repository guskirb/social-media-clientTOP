import { useState } from "react";
import { cn } from "../../utils/cn";

export default function ProfileFeed({ user }) {
  const [showing, setShowing] = useState("posts");

  return (
    <div className="w-full flex gap-1 bg-white p-1 rounded-xl">
      <div
        onClick={() => setShowing("posts")}
        className={cn(
          "w-full font-medium p-3 flex justify-center cursor-pointer rounded-xl transition-all opacity-50",
          showing === "posts" && "bg-gray-100 opacity-100"
        )}
      >
        Posts
      </div>
      <div
        onClick={() => setShowing("likes")}
        className={cn(
          "w-full font-medium p-3 flex justify-center cursor-pointer rounded-xl transition-all opacity-50",
          showing === "likes" && "bg-gray-100 opacity-100"
        )}
      >
        Likes
      </div>
    </div>
  );
}
