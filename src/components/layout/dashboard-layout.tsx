import { ReactNode } from "react";
import { House, ThumbsUp, User, Bell, Ellipsis } from "lucide-react";
import { NavLink, Link } from "react-router-dom";

import { cn } from "../../utils/cn";
import useAuthStore from "../../hooks/use-auth-store";
import ProfileImg from "../ui/profile/profile-img";
import Progress from "../ui/loader/progress";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  const user = useAuthStore((state) => state.user);
  const navigation = [
    { name: "Home", to: "/home", icon: House },
    { name: "Requests", to: "requests", icon: Bell },
    { name: "Likes", to: "/likes", icon: ThumbsUp },
    { name: "Profile", to: `/profile/${user!.username}`, icon: User },
  ];

  return (
    <div className="flex justify-center bg-gray-100 min-h-full">
      <Progress />
      <div className="flex flex-col items-end min-w-[80px] lg:w-full">
        <div className="fixed flex flex-col gap-3 p-5 lg:p-8 h-full items-center lg:items-start">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  "flex gap-3 font-medium items-center w-fit justify-start transition-all duration-200 rounded-xl bg-gray-100 p-2 hover:bg-white lg:pr-3",
                  isActive && "bg-white"
                )
              }
            >
              <item.icon className="" aria-hidden="true" />
              <p className="text-xl hidden lg:block">{item.name}</p>
            </NavLink>
          ))}
          <Link
            to={`/profile/${user!.username}`}
            className="flex gap-3 items-center mt-auto w-10 h-10 lg:w-fit lg:h-fit lg:bg-white lg:p-2 lg:rounded-xl lg:pr-3"
          >
            <ProfileImg image={user!.profileImg} />
            <div>
              <p className="text-xl font-medium hidden lg:block">
                {user?.name || user!.username}
              </p>
              <p className="text-sm opacity-70 hidden -mt-1 lg:block">
                {user!.username}
              </p>
            </div>
            <Ellipsis size={18} color="#7a7a7a" className="ml-auto" />
          </Link>
        </div>
      </div>
      <main className="w-full lg:min-w-[620px] py-4 pr-4 lg:pr-0 flex flex-col gap-4">
        {children}
      </main>
      <div className="hidden lg:block lg:w-full"></div>
    </div>
  );
}
