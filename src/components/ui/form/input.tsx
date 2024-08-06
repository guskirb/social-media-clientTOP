import FieldWrapper from "./field-wrapper";

type InputProps = {
  errorMessage?: string | null;
  type: string;
  placeholder: string;
  register: any;
};

export default function Input({
  errorMessage,
  type,
  placeholder,
  register,
}: InputProps) {
  return (
    <FieldWrapper errorMessage={errorMessage}>
      <input
        className="rounded border-black border p-1 px-2 w-full"
        type={type}
        placeholder={placeholder}
        {...register}
      />
    </FieldWrapper>
  );
}
