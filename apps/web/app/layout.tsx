import "./globals.css";
import "@repo/ui/styles.css";
import { Inter } from "next/font/google";
import { Providers } from "../provider";
import React from "react";
import { Toaster } from "@repo/ui/components";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body
        className={
          inter.className +
          " flex flex-col items-stretch h-screen bg-slate-950 text-slate-300"
        }
      >
        <Toaster />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
