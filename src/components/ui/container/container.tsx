import { ReactNode } from "react";

export default function Container({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-xl bg-white shadow-sm h-fit w-full">
      {children}
    </div>
  );
}
