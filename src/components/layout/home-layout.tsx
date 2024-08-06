import { ReactNode } from "react";
import Head from "../seo/head";

type LayoutProps = {
  children: ReactNode;
  title: string;
};

export default function Layout({ children, title }: LayoutProps) {
  return (
    <>
      <Head title={title} />
      <div>{children}</div>
    </>
  );
}
