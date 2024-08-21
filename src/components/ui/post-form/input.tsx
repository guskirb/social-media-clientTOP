import { ChangeEvent, useRef } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

import { useAutosizeTextArea } from "../../../hooks/use-autosize-textarea";

interface InputProps {
  placeholder: string;
  register: UseFormRegister<FieldValues>;
  name: string;
  value: string;
  setValue: (value: string) => void;
}

export default function Input({
  placeholder,
  register,
  name,
  value,
  setValue,
}: InputProps) {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  useAutosizeTextArea(textAreaRef.current, value);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setValue(val);
  };

  const { ref, ...rest } = register(name, {
    onChange: handleChange,
  });

  return (
    <textarea
      className="overflow-hidden transition-all p-2 resize-none focus:outline-none w-full dark:bg-slate-700"
      ref={(e) => {
        ref(e);
        textAreaRef.current = e;
      }}
      rows={1}
      value={value}
      placeholder={placeholder}
      {...rest}
    />
  );
}
