import { ReactNode } from "react";
import Head from "../seo/head";
import DarkMode from "./dark-mode/dark-mode";
import { Share2 } from "lucide-react";

interface LayoutProps {
  children: ReactNode;
  title: string;
}

export default function Layout({ children, title }: LayoutProps) {
  return (
    <>
      <Head title={title} />
      <div className="transition-all flex flex-col gap-8 w-full h-full justify-center items-center bg-gray-100 dark:bg-slate-800">
        <div className="transition-all text-blue-500 dark:text-white flex items-center gap-2">
          <Share2 size={40} />
          <p className="text-4xl font-medium">Connect</p>
        </div>
        {children}
      </div>
      <div className="fixed right-4 bottom-4 lg:right-14 lg:bottom-14">
        <DarkMode />
      </div>
    </>
  );
}
