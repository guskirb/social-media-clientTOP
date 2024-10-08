import { Outlet } from "react-router-dom";

import useAuthStore from "../hooks/use-auth-store";
import { useEffect, useState } from "react";
import { getUser, logout } from "./auth";
import Loader from "../components/ui/loader/loader";
import { Request, User } from "../types/types";

export default function PersistAuth() {
  const setIsLoggedIn = useAuthStore((state) => state.setIsLoggedIn);
  const setUser = useAuthStore((state) => state.setUser);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAuth = async () => {
      const user = await getUser();
      if (user.success) {
        setIsLoggedIn(true);
        setUser({
          username: user.user.username,
          name: user.user.name,
          profileImg: user.user.profileImg,
          friends: user.user.friends.map((user: User) => user.id),
          requests: user.user.requests.map(
            (request: Request) => request.fromUserId
          ),
          outgoingRequests: user.user.outgoingRequests.map(
            (request: Request) => request.toUserId
          ),
          id: user.user.id,
        });
      } else {
        logout();
      }
      setLoading(false);
    };

    if (!isLoggedIn) {
      getAuth();
    }
  }, []);

  if (loading) {
    return <Loader />;
  }

  return <Outlet />;
}
