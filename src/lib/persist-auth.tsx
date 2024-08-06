import { useEffect } from "react";
import useAuth from "../hooks/use-auth";
import { getUser, logout } from "./auth";
import { Outlet } from "react-router-dom";

export default function PersistAuth() {
  const setUser = useAuth((state) => state.setUser);
  const user = useAuth((state) => state.user);

  useEffect(() => {
    const getAuth = async () => {
      const user = await getUser();
      if (user.success) {
        setUser(user.user);
      } else {
        logout();
        setUser(null);
      }
    };

    if (!user) {
      getAuth();
    }
  }, []);

  return <Outlet />;
}
