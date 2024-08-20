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
      className="flex items-center w-full"
    >
      <Search size={20} color="#7a7a7a" className="absolute ml-2" />
      <input
        type="text"
        ref={queryRef}
        placeholder="Search"
        className="pl-9 p-2 rounded-xl w-full"
      />
    </form>
  );
}
