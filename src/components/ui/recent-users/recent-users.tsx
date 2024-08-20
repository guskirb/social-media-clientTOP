import { Users } from "lucide-react";

import Container from "../container/container";
import { useRecentUsers } from "./api/get-recent-users";
import { useEffect } from "react";
import Loader from "../loader/loader";
import UserList from "../user-list/user-list";

export default function RecentUsers() {
  const { data: users, isLoading } = useRecentUsers();

  useEffect(() => {
    console.log(users);
  }, [users]);

  return (
    <Container>
      <div className="p-4 flex flex-col gap-3 bg-white rounded-xl">
        <div className="flex items-center gap-3">
          <Users size={22} />
          <p className="text-lg font-medium">Recent Users</p>
        </div>
        {isLoading ? <Loader/> : (
            <UserList users={users.users} size="small"/>
        )}
      </div>
    </Container>
  );
}
