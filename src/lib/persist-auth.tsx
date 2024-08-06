import { Outlet } from "react-router-dom";

import useAuthStore from "../hooks/use-auth-store";
import { useEffect, useState } from "react";
import { getUser, logout } from "./auth";

export default function PersistAuth() {
  const setIsLoggedIn = useAuthStore((state) => state.setIsLoggedIn);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAuth = async () => {
      const user = await getUser();
      console.log(user);
      if (user.success) {
        setIsLoggedIn(true);
      } else {
        logout();
        setIsLoggedIn(false);
      }
      setLoading(false);
    };

    if (!isLoggedIn) {
      getAuth();
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <Outlet />;
}
