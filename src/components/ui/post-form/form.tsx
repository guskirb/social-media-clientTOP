import { ReactNode } from "react";
import Container from "../container/container";

type FormProps = {
  children: ReactNode;
  onSubmit: any;
};

export default function Form({ children, onSubmit }: FormProps) {
  return (
    <Container>
      <form
        method="post"
        action=""
        className="flex p-3 bg-white"
        onSubmit={onSubmit}
      >
        {children}
      </form>
    </Container>
  );
}
