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
        className="flex p-4 bg-white rounded-xl"
        onSubmit={onSubmit}
      >
        {children}
      </form>
    </Container>
  );
}
