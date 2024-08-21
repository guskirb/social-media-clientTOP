import { Link } from "react-router-dom";
import User from "../user/user";
import { User as UserType } from "../../../types/types";
import SmallUser from "../user/small-user";
import { cn } from "../../../utils/cn";

interface UserListProps {
  users: Array<UserType>;
  size: string;
}

export default function UserList({ users, size }: UserListProps) {
  return (
    <>
      <div
        className={cn("flex flex-col", size === "normal" ? "gap-4" : "gap-2")}
      >
        {users.map((user) => {
          return (
            <div key={user.id}>
              <Link to={`/profile/${user.username}`}>
                {size === "normal" ? (
                  <User user={user} />
                ) : (
                  <SmallUser user={user} />
                )}
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
}
