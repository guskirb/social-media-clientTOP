import { ReactNode } from "react";

import Error from "./error";

type FieldWrapperProps = {
  children: ReactNode;
  errorMessage?: string | null;
};

export default function FieldWrapper({
  children,
  errorMessage,
}: FieldWrapperProps) {
  return (
    <div>
      {children}
      <Error errorMessage={errorMessage} />
    </div>
  );
}
