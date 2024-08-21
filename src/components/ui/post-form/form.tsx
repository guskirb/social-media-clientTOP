import { ReactNode } from "react";
import Container from "../container/container";

interface FormProps {
  children: ReactNode;
  onSubmit: any;
}

export default function Form({ children, onSubmit }: FormProps) {
  return (
    <Container>
      <form
        method="post"
        action=""
        className="transition-all flex p-4 bg-white dark:bg-slate-700 dark:text-white rounded-xl"
        onSubmit={onSubmit}
      >
        {children}
      </form>
    </Container>
  );
}
