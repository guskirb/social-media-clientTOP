import { useEffect } from "react";
import useAuthStore from "../hooks/use-auth-store";
import { getUser, logout } from "./auth";
import { Outlet } from "react-router-dom";

export default function PersistAuth() {
  const setUser = useAuthStore((state) => state.setUser);
  const user = useAuthStore((state) => state.user);

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
