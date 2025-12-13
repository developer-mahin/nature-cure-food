"use client";
import SocialIcons from "@/components/common/SocialIcons";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";
import { assets } from "../../../../../../../public/assets";
import { navItems } from "@/components/fakeData/navItem";

const SideNav = () => {
  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
            <Menu className="h-5 w-5" />
          </button>
        </SheetTrigger>
        <SheetContent className="overflow-y-scroll h-full">
          <SheetHeader>
            <nav className="p-4">
              {navItems.map((item, index) => (
                <div
                  key={index}
                  className="py-3 border-b border-gray-100 text-gray-700 hover:text-teal-600 cursor-pointer transition-colors"
                >
                  <Link href={item.path}>{item.title}</Link>
                </div>
              ))}
            </nav>
            {/* Contact Information */}
            <div className="mt-0 space-y-4 p-4">
              <div className="flex items-center gap-3 text-gray-700">
                <Image
                  src={assets.icons.email}
                  alt="Email"
                  width={20}
                  height={20}
                />
                <span className="text-sm">info@webmail.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <Image
                  src={assets.icons.location}
                  alt="Email"
                  width={20}
                  height={20}
                />
                <span className="text-sm">15/A, Nest Tower, NYC</span>
              </div>
              <div className="flex items-start gap-3 text-gray-700">
                <Image
                  src={assets.icons.phone}
                  alt="Email"
                  width={20}
                  height={20}
                />
                <div>
                  <div className="text-sm">Call Now</div>
                  <div className="font-semibold">+09617400800</div>
                </div>
              </div>
            </div>

            {/* Social Media Icons */}
            <div className="mt-6 px-0 flex items-center justify-center bg-gray-200 py-2" >
              <SocialIcons />
            </div>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default SideNav;
