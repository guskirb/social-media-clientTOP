import { ChangeEvent, useRef, useState } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

import { useAutosizeTextArea } from "../../../hooks/use-autosize-textarea";

type InputProps = {
  placeholder: string;
  register: UseFormRegister<FieldValues>;
  name: string;
  value: string;
  setValue: any;
};

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
      className="p-2 resize-none focus:outline-none w-full"
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
