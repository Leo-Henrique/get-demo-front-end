"use client";

import { cn } from "@/lib/utils";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { ComponentProps, ReactNode } from "react";

type BaseLinkProps = LinkProps & ComponentProps<"a">;

interface NavLinkProps extends BaseLinkProps {
  children: ReactNode;
  activeClassName?: string;
  disabledClassName?: string;
  disabled: boolean;
}

export function NavLink({
  children,
  className,
  activeClassName,
  disabledClassName,
  href,
  disabled,
  ...rest
}: NavLinkProps) {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={cn(
        className,
        pathname.includes(href) && href !== "/" && activeClassName,
        disabled && disabledClassName,
      )}
      {...rest}
      {...(disabled && { onClick: e => e.preventDefault() })}
    >
      {children}
    </Link>
  );
}
