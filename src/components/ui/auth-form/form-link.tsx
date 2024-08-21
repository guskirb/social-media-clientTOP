import { Link } from "react-router-dom";

interface FormLinkProps {
  text: string;
  route: string;
  link: string;
}

export default function FormLink({ text, route, link }: FormLinkProps) {
  return (
    <p className="self-center text-sm -translate-y-4">
      {text + " "}
      <Link
        className="font-medium text-blue-500 dark:text-blue-600  hover:underline hover:text-blue-600 dark:hover:text-blue-700"
        to={`/${route}`}
      >
        {link}
      </Link>
    </p>
  );
}
