"use client";

import Link from "next/link";
import cn from "classnames";
import { usePathname } from "next/navigation";

export const NavItem = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  const pathname = usePathname();

  return (
    <Link
      className={cn("block mb-2 hover:bg-red-900 p-2 rounded-md", {
        "bg-red-900": pathname === href,
      })}
      href={href}
    >
      {children}
    </Link>
  );
};
