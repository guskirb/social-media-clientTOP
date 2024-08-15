import { ReactNode } from "react";
import Head from "../seo/head";

interface LayoutProps {
  children: ReactNode;
  title: string;
}

export default function Layout({ children, title }: LayoutProps) {
  return (
    <>
      <Head title={title} />
      <div className="w-full h-full flex justify-center items-center">
        {children}
      </div>
    </>
  );
}
