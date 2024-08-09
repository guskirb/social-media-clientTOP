import { ReactNode } from "react";
import { House, ThumbsUp, User, Bell } from "lucide-react";
import { NavLink, Link } from "react-router-dom";

import { cn } from "../../utils/cn";
import useAuthStore from "../../hooks/use-auth-store";
import ProfileImg from "../ui/profile/profile-img";

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
    <div className="flex h-full justify-center">
      <div className="flex flex-col items-end min-w-[80px] lg:w-full">
        <div className="fixed flex flex-col gap-5 p-5 lg:p-8 h-full items-center lg:items-start">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  "flex gap-3 items-center w-fit justify-start hover:text-red-400 transition-all duration-200",
                  isActive && "text-red-400"
                )
              }
            >
              <item.icon className="" aria-hidden="true" />
              <p className="text-xl hidden lg:block">{item.name}</p>
            </NavLink>
          ))}
          <Link
            to={`/profile/${user!.username}`}
            className="flex gap-3 items-center mt-auto w-10 h-10 lg:w-fit lg:h-fit"
          >
            <ProfileImg image={user!.profileImg} />
            <p className="text-xl hidden lg:block">{user!.username}</p>
          </Link>
        </div>
      </div>
      <main className="bg-gray-100 w-full lg:min-w-[620px]">{children}</main>
      <div className="hidden lg:block lg:w-full"></div>
    </div>
  );
}
