import { ReactNode } from "react";

type FormProps = {
  children: ReactNode;
  onSubmit: any;
  title: string;
};

export default function Form({ children, onSubmit, title }: FormProps) {
  return (
    <form
      method="post"
      action=""
      className="flex flex-col gap-7 p-7 rounded-xl border border-gray-300 w-[500px]"
      onSubmit={onSubmit}
    >
      <h1 className="text-3xl self-center p-3">{title}</h1>
      {children}
    </form>
  );
}
