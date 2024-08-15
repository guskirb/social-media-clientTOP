import FieldWrapper from "./field-wrapper";

interface InputProps {
  errorMessage?: string | null;
  type: string;
  placeholder: string;
  register: any;
}

export default function Input({
  errorMessage,
  type,
  placeholder,
  register,
}: InputProps) {
  return (
    <FieldWrapper errorMessage={errorMessage}>
      <div className="relative">
        <input
          id={placeholder}
          placeholder=" "
          className={
            errorMessage
              ? "block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border appearance-none dark:text-white dark:border-red-500 border-red-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer"
              : "block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          }
          type={type}
          {...register}
        />
        <label
          htmlFor={placeholder}
          className={
            errorMessage
              ? "absolute text-sm text-red-600 dark:text-red-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
              : "absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
          }
        >
          {placeholder}
        </label>
      </div>
    </FieldWrapper>
  );
}
