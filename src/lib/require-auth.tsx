import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../hooks/use-auth-store";

export default function RequireAuth() {
  const user = useAuthStore((state) => state.user);

  return user ? <Outlet /> : <Navigate to="/login" replace />;
}
