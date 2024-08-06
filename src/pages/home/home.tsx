
import useAuthStore from "../../hooks/use-auth-store";

export default function Home() {
  const user = useAuthStore((state) => state.user);
  
  return (
    <div>{user!.username}</div>
  );
}
