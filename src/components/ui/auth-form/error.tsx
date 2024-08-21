interface ErrorProps {
  errorMessage?: string | null;
}

export default function Error({ errorMessage }: ErrorProps) {
  if (!errorMessage) return null;

  return (
    <div className="absolute mt-2 text-xs text-red-500 dark:text-red-300 -translate-y-1.5 translate-x-2.5">
      {errorMessage}
    </div>
  );
}
