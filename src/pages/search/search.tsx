import { useState } from "react";
import ConditionalButton from "../../components/ui/conditional-button/conditional-button";
import SearchPosts from "./search-posts";
import SearchUsers from "./search-users";

export default function Search({ params }: { params: string }) {
  const [showing, setShowing] = useState("posts");

  return (
    <>
      <ConditionalButton
        showing={showing}
        setShowing={setShowing}
        conditions={["posts", "users"]}
      />
      <div className="flex flex-col gap-4">
        {showing === "posts" ? (
          <>
            <SearchPosts params={params} />
          </>
        ) : (
          <>
            <SearchUsers params={params} />
          </>
        )}
      </div>
    </>
  );
}
