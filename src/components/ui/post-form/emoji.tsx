import { Smile } from "lucide-react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { useState } from "react";
import { useRef, useEffect } from "react";

interface EmojiProps {
  value: string;
  setValue: (value: string) => void;
}

export default function Emoji({ value, setValue }: EmojiProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  function addEmoji(e: any) {
    const sym = e.unified.split("_");
    const codeArray: Array<any> = [];
    sym.forEach((item: any) => codeArray.push("0x" + item));
    let emoji = String.fromCodePoint(...codeArray);
    setValue(value + emoji);
  }

  function handleOutsideClick({ target }: MouseEvent) {
    if (dropdownRef.current && !dropdownRef.current.contains(target as Node)) {
      setShowDropdown(false);
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <>
      <div>
        <Smile
          color="#9ca3af"
          size={30}
          strokeWidth={1.5}
          className="cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-600 rounded-xl p-1"
          onClick={() => setShowDropdown(!showDropdown)}
        />
        {showDropdown && (
          <div
            className="absolute w-fit rounded-xl translate-x-2 -translate-y-2 z-10"
            ref={dropdownRef}
          >
            <Picker
              data={data}
              emojiSize={20}
              emojiButtonSize={28}
              onEmojiSelect={addEmoji}
            />
          </div>
        )}
      </div>
    </>
  );
}
