import { Link } from "react-router-dom";
import User from "../user/user";
import { User as UserType } from "../../../types/types";
import SmallUser from "../user/small-user";

interface UserListProps {
  users: Array<UserType>;
  size: string;
}

export default function UserList({ users, size }: UserListProps) {
  return (
    <>
      <div className="flex flex-col gap-4">
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
