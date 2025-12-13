"use client";

import SocialIcons from "@/components/common/SocialIcons";
import Container from "@/components/reusable/Container";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { useEffect, useState } from "react";

const TopNav = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600); // 600ms skeleton loading

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <Container className={"w-[95%] py-2 lg:py-1"}>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-x-10">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-5 w-36" />
          </div>
          <div className="flex items-center gap-x-3">
            <Skeleton className="h-5 w-5 rounded-full" />
            <Skeleton className="h-5 w-5 rounded-full" />
            <Skeleton className="h-5 w-5 rounded-full" />
            <Skeleton className="h-5 w-5 rounded-full" />
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container className={"w-[95%] py-2 lg:py-1"}>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-x-10">
          <div className="flex items-center gap-x-1">
            <Image
              src="/assets/icons/Email.svg"
              alt="Email"
              width={20}
              height={20}
            />
            <a
              href="mailto:example@gmail"
              target="_blank"
              className="text-sm font-light"
            >
              example@gmail.com
            </a>
          </div>
          <div className="flex items-center gap-x-1">
            <Image
              src="/assets/icons/Location.svg"
              alt="Brand Logo"
              width={20}
              height={20}
            />
            <p className="text-sm font-light">15/A Nest Tower, NYC</p>
          </div>
        </div>

        <SocialIcons />
      </div>
    </Container>
  );
};

export default TopNav;
