type InputProps = {
  placeholder: string;
};

export default function Input({ placeholder }: InputProps) {
  return (
    <input
      className="rounded border-black border p-0.5 px-1"
      placeholder={placeholder}
    />
  );
}
