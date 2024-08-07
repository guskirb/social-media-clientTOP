import { ReactNode } from "react";
import { House, ThumbsUp, User } from "lucide-react";
import { NavLink } from "react-router-dom";

import { cn } from "../../utils/cn";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  const navigation = [
    { name: "Home", to: "/home", icon: House },
    { name: "Likes", to: "/likes", icon: ThumbsUp },
    { name: "Profile", to: "/", icon: User },
  ];

  return (
    <div className="grid grid-cols-6 grid-rows-1 h-full">
      <div className="col-start-1 col-end-2 lg:col-end-3 flex flex-col items-end">
        <div className="flex flex-col gap-5 p-10">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  "flex gap-3 items-center w-fit justify-start",
                  isActive && "text-red-400"
                )
              }
            >
              <item.icon className="" aria-hidden="true" />
              <p className="text-xl hidden lg:block">{item.name}</p>
            </NavLink>
          ))}
        </div>
      </div>
      <main className="col-start-2 col-end-7 lg:col-start-3 xl:col-end-5 bg-gray-100">
        {children}
      </main>
      <div></div>
    </div>
  );
}
