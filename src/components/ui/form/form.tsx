import { ReactNode } from "react";

type FormProps = {
  children: ReactNode;
};

export default function Form({ children }: FormProps) {
  return (
    <form method="post" className="flex flex-col gap-2">
      {children}
    </form>
  );
}
