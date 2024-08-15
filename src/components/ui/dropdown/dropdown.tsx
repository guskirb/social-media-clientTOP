import { Ellipsis } from "lucide-react";
import React, { ReactNode, useEffect, useRef } from "react";

type DropdownProps = {
  showDropdown: boolean;
  setShowDropdown: any;
  children: ReactNode;
};

export default function Dropdown({
  showDropdown,
  setShowDropdown,
  children,
}: DropdownProps) {
  const buttonRef = useRef<HTMLDivElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  function handleOutsideClick({ target }: MouseEvent) {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(target as Node) &&
      target !== buttonRef.current
    ) {
      setShowDropdown(false);
    }
  }

  function stopPropogation(e: React.MouseEvent) {
    e.stopPropagation();
    e.preventDefault();
  }

  function dropdownClick(e: React.MouseEvent) {
    e.preventDefault();
    setShowDropdown(!showDropdown);
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <>
      <div
        className="ml-auto cursor-pointer"
        onClick={dropdownClick}
        ref={buttonRef}
      >
        <Ellipsis size={24} color="#7a7a7a"  className="hover:bg-gray-100 rounded-xl p-1"/>
      </div>
      {showDropdown && (
        <div
          className="absolute w-fit top-0 right-0 bg-gray-100 rounded-xl p-3 translate-x-2 -translate-y-2"
          onClick={stopPropogation}
          ref={dropdownRef}
        >
          {children}
        </div>
      )}
    </>
  );
}
