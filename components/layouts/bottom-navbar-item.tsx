"use client";

import { Badge } from "@nextui-org/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface BottomNavbarItemProps {
  href: string;
  icon: any;
  badgeContent?: string;
}
export const BottomNavbarItem = ({
  href,
  icon,
  badgeContent,
}: BottomNavbarItemProps) => {
  const pathname = usePathname();
  const isActive = href === "/" ? pathname === href : pathname.startsWith(href);

  return (
    <Link href={href} className="flex justify-center">
      <div
        className={`py-4 px-2 border-t-4 ${
          isActive ? "border-black" : "border-transparent"
        }`}
      >
        <Badge
          content={badgeContent}
          size="lg"
          color="primary"
          isInvisible={!badgeContent}
        >
          {icon}
        </Badge>
      </div>
    </Link>
  );
};
