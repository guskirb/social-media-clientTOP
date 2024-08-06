import { ReactNode } from "react";

type FormProps = {
  children: ReactNode;
  onSubmit: any;
};

export default function Form({ children, onSubmit }: FormProps) {
  return (
    <form
      method="post"
      action=""
      className="flex flex-col gap-5 p-5 rounded border-black border w-96"
      onSubmit={onSubmit}
    >
      {children}
    </form>
  );
}
