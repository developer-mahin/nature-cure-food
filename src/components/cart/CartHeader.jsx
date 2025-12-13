"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

const CartHeader = () => {
  return (
    <div className="relative bg-white">
      {/* Green line at top */}
      <div className="h-1 bg-green-600"></div>

      {/* Main header section with background */}
      <div
        className="relative min-h-[400px] w-full flex items-center justify-start bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/assets/images/shope-page.png')",
          backgroundPosition: "right center",
        }}
      >
        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-white/60"></div>

        {/* Content container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
          {/* Shopping Cart Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            Shopping Cart
          </h1>

          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-gray-600 text-lg">
            <Link
              href="/"
              className="flex items-center gap-1 hover:text-green-600 transition-colors"
            >
              <Home className="w-4 h-4" />
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-800 font-medium">
              Your Shopping Cart
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartHeader;
