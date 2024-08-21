import { ReactNode } from "react";

export default function Container({ children }: { children: ReactNode }) {
  return (
    <div className="transition-all rounded-xl bg-white dark:bg-slate-700 shadow-sm h-fit w-full">
      {children}
    </div>
  );
}
