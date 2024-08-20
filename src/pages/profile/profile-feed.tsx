import { useState } from "react";

import { User } from "../../types/types";
import ProfilePosts from "./profile-posts";
import ProfileLikes from "./profile-likes";
import ConditionalButton from "../../components/ui/conditional-button/conditional-button";

export default function ProfileFeed({ user }: { user: User }) {
  const [showing, setShowing] = useState("posts");

  return (
    <>
      <ConditionalButton
        showing={showing}
        setShowing={setShowing}
        conditions={["posts", "likes"]}
      />
      {showing === "posts" ? (
        <ProfilePosts user={user} />
      ) : (
        <ProfileLikes user={user} />
      )}
    </>
  );
}
