import { Link } from "react-router-dom";
import User from "../user/user";
import { User as UserType } from "../../../types/types";
import SmallUser from "../user/small-user";
import { cn } from "../../../utils/cn";
import { UserX } from "lucide-react";

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
        {users.length > 0 ? (
          users.map((user) => {
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
          })
        ) : (
          <div className="opacity-70 dark:text-white w-full p-10 flex flex-col gap-3 justify-center items-center">
            <UserX size={60} strokeWidth={1.5} />
            <p className="font-medium">No users to display.</p>
          </div>
        )}
      </div>
    </>
  );
}
