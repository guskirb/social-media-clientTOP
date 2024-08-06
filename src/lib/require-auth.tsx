import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../hooks/use-auth-store";

export default function RequireAuth() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
}
