import { ReactNode } from "react";

interface FormProps {
  children: ReactNode;
  onSubmit: any;
  title: string;
}

export default function Form({ children, onSubmit, title }: FormProps) {
  return (
    <form
      method="post"
      action=""
      className="transition-all flex flex-col gap-7 p-7 rounded-xl shadow-sm bg-white dark:text-white dark:bg-slate-700 border-gray-300 w-[500px]"
      onSubmit={onSubmit}
    >
      <h1 className="text-3xl self-center p-3">{title}</h1>
      {children}
    </form>
  );
}
