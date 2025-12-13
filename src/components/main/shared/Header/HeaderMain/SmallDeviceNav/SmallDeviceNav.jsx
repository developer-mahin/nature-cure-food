"use client";

import CartSheet from "@/components/cart/CartSheet";
import SiteLogo from "@/components/common/SiteLogo";
import SearchModal from "@/components/ui/SearchModal";
import { Skeleton } from "@/components/ui/skeleton";
import { useCart } from "@/context/CartContext";
import { Search, ShoppingCart, User } from "lucide-react";
import { useEffect, useState } from "react";
import SideNav from "./SideNav";

const SmallDeviceNav = () => {
  const { itemCount } = useCart();
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600); // 600ms skeleton loading

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <section className="fixed left-0 top-0 right-0 bg-white border-b shadow-sm z-[99] w-full overflow-hidden">
        <div className="px-4 py-3 max-w-full">
          <div className="flex items-center justify-between w-full">
            {/* Logo Skeleton */}
            <Skeleton className="h-10 w-32" />

            {/* Icons Skeleton */}
            <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="fixed left-0 top-0 right-0 bg-white border-b shadow-sm z-[99] w-full overflow-hidden">
      <div className="px-4 py-3 max-w-full">
        <div className="flex items-center justify-between w-full">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <SiteLogo />
          </div>

          {/* Right side icons */}
          <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
            {/* Search Icon */}
            <button
              onClick={() => setShowSearchModal(true)}
              className="p-1 sm:p-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Search className="h-5 w-5" />
            </button>

            {/* User Icon */}
            <button className="p-1 sm:p-2 text-gray-600 hover:text-gray-900 transition-colors">
              <User className="h-5 w-5" />
            </button>

            {/* Cart Icon with CartSheet */}
            <CartSheet
              listenToOpenEvent={false}
              trigger={
                <button className="relative p-1 sm:p-2 text-gray-600 hover:text-gray-900 transition-colors">
                  <ShoppingCart className="h-5 w-5" />
                  {itemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {itemCount}
                    </span>
                  )}
                </button>
              }
            />

            {/* Menu Icon */}
            <SideNav />
          </div>
        </div>
      </div>

      {/* Search Modal */}
      <SearchModal
        open={showSearchModal}
        onClose={() => setShowSearchModal(false)}
      />
    </section>
  );
};

export default SmallDeviceNav;
