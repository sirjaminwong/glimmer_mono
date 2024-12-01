import "@repo/ui/styles.css";
import { Inter } from "next/font/google";

import React from "react";
import UserProfile from "../../modules/user/components/user-profile";
import Nav from "../../modules/common/components/nav";

const inter = Inter({ subsets: ["latin"] });

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <>
      <header className="h-16 w-full flex-none border-b border-slate-500 py-2 px-4 flex justify-between items-center">
        <UserProfile />
      </header>

      <main className="flex-auto flex items-stretch">
        <Nav />
        <section className="flex-auto">{children}</section>
      </main>
    </>
  );
}
