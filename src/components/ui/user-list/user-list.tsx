import { Link } from "react-router-dom";
import User from "../user/user";
import { User as UserType } from "../../../types/types";

export default function UserList({ users }: { users: Array<UserType> }) {
  return (
    <>
      <div className="flex flex-col gap-4">
        {users.map((user) => {
          return (
            <div key={user.id}>
              <Link to={`/profile/${user.username}`}>
                <User user={user} />
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
}
