import { Link, useNavigate } from "react-router-dom";
import { Ellipsis, LogOut } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import ProfileImg from "../profile/profile-img";
import { logout } from "../../../lib/auth";
import useAuthStore, { UserObject } from "../../../hooks/use-auth-store";
import DarkMode from "../../layout/dark-mode/dark-mode";

export default function ProfileMenu({ user }: { user: UserObject }) {
  const [showing, setShowing] = useState(false);
  const navigate = useNavigate();
  const buttonRef = useRef<HTMLDivElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const setUser = useAuthStore((state) => state.setUser);
  const setIsLoggedIn = useAuthStore((state) => state.setIsLoggedIn);

  function handleOutsideClick({ target }: MouseEvent) {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(target as Node) &&
      target !== buttonRef.current
    ) {
      setShowing(false);
    }
  }

  function stopPropogation(e: React.MouseEvent) {
    e.stopPropagation();
    e.preventDefault();
  }

  function dropdownClick(e: React.MouseEvent) {
    e.preventDefault();
    setShowing(!showing);
  }

  function logOutHandler() {
    logout();
    setUser(null);
    setIsLoggedIn(false);
    navigate("/login");
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="mt-auto lg:w-[180px] flex flex-col gap-4 lg:gap-2 items-center">
      <div className="flex lg:hidden flex-col gap-4 items-center">
      <div>
        <DarkMode />
      </div>
        <li onClick={logOutHandler} className="flex items-center gap-2 dark:text-white opacity-70 hover:opacity-100">
          <LogOut size={23} className="cursor-pointer" />
        </li>
      </div>
      {showing && (
        <div
          ref={dropdownRef}
          onClick={stopPropogation}
          className="dark:text-white hidden gap-3 items-center w-10 h-10 lg:w-full lg:flex lg:h-fit lg:bg-white dark:bg-slate-700 lg:py-2 lg:rounded-xl shadow-sm"
        >
          <ul className="w-full">
            <li
              onClick={logOutHandler}
              className="flex items-center gap-2 cursor-pointer w-full px-2 py-1 hover:bg-gray-50 dark:hover:dark:bg-slate-600 opacity-70 hover:opacity-100 transition-all"
            >
              <LogOut size={18} />
              <p className="font-medium">Log Out</p>
            </li>
          </ul>
        </div>
      )}

      <Link
        to={`/profile/${user.username}`}
        className="transition-all dark:text-white cursor-pointer flex gap-3 items-center w-10 h-10 lg:w-full lg:h-fit lg:bg-white lg:dark:bg-slate-700 lg:p-2 lg:rounded-xl lg:pr-3 shadow-sm"
      >
        <ProfileImg image={user!.profileImg!} />
        <div>
          <p className="text-xl font-medium hidden lg:block">
            {user?.name || user!.username}
          </p>
          <p className="text-sm opacity-70 hidden -mt-1 lg:block">
            {user!.username}
          </p>
        </div>
        <div
          className="ml-auto hidden lg:block"
          ref={buttonRef}
          onClick={dropdownClick}
        >
          <Ellipsis
            size={25}
            className="opacity-70 ml-auto hover:bg-gray-100 dark:hover:dark:bg-slate-600 rounded-xl p-1"
          />
        </div>
      </Link>
    </div>
  );
}
