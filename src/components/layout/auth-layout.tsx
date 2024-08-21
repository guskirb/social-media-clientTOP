import { ReactNode } from "react";
import Head from "../seo/head";
import DarkMode from "./dark-mode/dark-mode";

interface LayoutProps {
  children: ReactNode;
  title: string;
}

export default function Layout({ children, title }: LayoutProps) {
  return (
    <>
      <Head title={title} />
      <div className="transition-all w-full h-full flex justify-center items-center bg-gray-100 dark:bg-slate-800">
        {children}
      </div>
      <DarkMode />
    </>
  );
}
