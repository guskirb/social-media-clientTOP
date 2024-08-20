import Loader from "../../components/ui/loader/loader";
import UserList from "../../components/ui/user-list/user-list";
import { useSearchUsers } from "./api/search-users";

export default function SearchUsers({ params }: { params: string }) {
  const { data: users, isLoading } = useSearchUsers(params);

  return (
    <>
      {isLoading ? <Loader /> : <UserList users={users.users} size="normal" />}
    </>
  );
}
