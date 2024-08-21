import { Search } from "lucide-react";
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const navigate = useNavigate();
  const queryRef = useRef<HTMLInputElement | null>(null);

  const searchHandler = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/search/${queryRef.current!.value}`);
  };

  return (
    <form
      action=""
      onSubmit={searchHandler}
      className="flex items-center w-full dark:text-white"
    >
      <Search size={20} className="absolute ml-2 opacity-70" />
      <input
        type="text"
        ref={queryRef}
        placeholder="Search"
        className="pl-9 p-2 rounded-xl w-full dark:bg-slate-700"
      />
    </form>
  );
}
