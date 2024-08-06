type ErrorProps = {
  errorMessage?: string | null;
};

export default function Error({ errorMessage }: ErrorProps) {
  if (!errorMessage) return null;

  return (
  <div className="absolute text-sm">
    {errorMessage}
  </div>
);
}
