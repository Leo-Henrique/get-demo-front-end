"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";
import { navigationRoutes } from "@/navigation-routes";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

export default function BreadcrumbNavigation() {
  const pathname = usePathname();
  const navigation: { path: string; text: string }[] = [...navigationRoutes];
  const hasCurrentPageOnNavigationRoutes = navigation.some(
    ({ path }) => path === pathname,
  );

  if (!hasCurrentPageOnNavigationRoutes) {
    const text = pathname
      .replace(navigation[navigation.length - 1].path, "")
      .replaceAll("/", "");

    navigation.push({
      path: pathname,
      text: text[0].toUpperCase() + text.slice(1),
    });
  } else {
    const currentRouteIndex = navigation.findIndex(
      ({ path }) => path === pathname,
    );

    navigation.splice(currentRouteIndex + 1);
  }

  return (
    <Breadcrumb className="mb-3">
      <BreadcrumbList>
        {navigation.map(({ path, text }, index) => {
          const isActiveLink = pathname === path;

          return (
            <Fragment key={path}>
              {index > 0 && <BreadcrumbSeparator />}

              <BreadcrumbItem key={path}>
                <BreadcrumbLink
                  href={path}
                  className={cn(
                    isActiveLink &&
                      "text-zinc-950 font-medium border-zinc-950 cursor-default",
                  )}
                  {...(isActiveLink && { onClick: e => e.preventDefault() })}
                >
                  {text}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
