import { ReactNode } from "react";

export default function Container({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-xl border border-black border-solid">
      {children}
    </div>
  );
}
