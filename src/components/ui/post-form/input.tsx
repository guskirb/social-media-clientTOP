import { ChangeEvent, useRef, useState } from "react";
import { useAutosizeTextArea } from "../../../hooks/use-autosize-textarea";

export default function Input({ register }) {
  const [value, setValue] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useAutosizeTextArea(textAreaRef.current, value);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setValue(val);
  };

  return (
    <textarea
      className="p-2 resize-none"
      onChange={handleChange}
      ref={textAreaRef}
      rows={1}
      value={value}
      placeholder="What's on your mind?"
      {...register}
    />
  );
}
