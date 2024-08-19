import { useState } from "react";
import ConditionalButton from "../../components/ui/conditional-button/conditional-button";
import SearchPosts from "./search-posts";

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
          
          </>
        )}
      </div>
    </>
  );
}
