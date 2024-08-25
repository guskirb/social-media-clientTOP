import { Users } from "lucide-react";

import Container from "../container/container";
import { useRecentUsers } from "./api/get-recent-users";
import Loader from "../loader/loader";
import UserList from "../user-list/user-list";

export default function RecentUsers() {
  const { data: users, isLoading } = useRecentUsers();

  return (
    <Container>
      <div className="transition-all flex flex-col bg-white dark:bg-slate-700 dark:text-white rounded-xl">
        <div className="flex items-center gap-3 p-3">
          <Users size={22} />
          <p className="text-lg font-medium">Recent Users</p>
        </div>
        {isLoading ? (
          <div className="p-5">
          <Loader />
          </div>
        ) : (
          <div className="pb-2">
            <UserList users={users.users} size="small" />
          </div>
        )}
      </div>
    </Container>
  );
}
