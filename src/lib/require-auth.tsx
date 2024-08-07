import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../hooks/use-auth-store";
import { ReactNode } from "react";

type RequireAuthProps = {
  children: ReactNode;
};

export default function RequireAuth({ children }: RequireAuthProps) {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  return isLoggedIn ? children : <Navigate to="/login" replace />;
}
