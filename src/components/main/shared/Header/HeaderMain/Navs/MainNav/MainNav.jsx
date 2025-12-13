"use client";

import Container from "@/components/reusable/Container";
import { NavigationMenuLink } from "@/components/ui/navigation-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { assets } from "../../../../../../../../public/assets";
import Ecommerce from "../../shared/Ecommerce/Ecommerce";
import Searchbar from "../../shared/Searchbar/Searchbar";

const MainNav = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 700); // 700ms skeleton loading

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <Container className={"w-[95%] py-0 lg:py-0"}>
        <div className="flex items-center justify-between gap-x-3">
          <div className="flex items-center lg:gap-x-20">
            <Skeleton className="h-[50px] w-[100px]" />
            <div className="flex items-center gap-x-3">
              <Skeleton className="h-5 w-5 rounded-full" />
              <div className="flex flex-col gap-y-1">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-4 w-28" />
              </div>
            </div>
          </div>

          <div className="flex justify-center lg:w-[480px] w-full">
            <Skeleton className="h-12 w-full rounded-full" />
          </div>

          <div className="flex items-center gap-x-4">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container className={"w-[95%] py-0 lg:py-0"}>
      <div className="flex items-center justify-between gap-x-3">
        <div className="flex items-center lg:gap-x-20">
          <Link href="/">
            <Image
              src={assets.images.logo}
              alt="Natural Cure Logo"
              width={100}
              height={100}
              style={{ width: "auto", height: "auto" }}
            />
          </Link>
          <div className="flex items-center gap-x-3">
            <Image
              src={assets.icons.phone}
              alt="phone"
              width={20}
              height={20}
              style={{ width: "auto", height: "auto" }}
            />
            <p className="flex flex-col">
              <span>Call Now</span>
              <span className="font-semibold">+880 1 234 5678</span>
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <Searchbar />
        </div>
        <Ecommerce />
      </div>
    </Container>
  );
};

export default MainNav;

const ListItem = React.forwardRef(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  }
);
ListItem.displayName = "ListItem";
