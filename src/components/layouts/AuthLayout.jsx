"use client";

import SiteLogo from "@/components/common/SiteLogo";
import Image from "next/image";
import Link from "next/link";

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-md lg:w-[500px]">
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-6"
            >
              <svg
                className="mr-2 h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Home
            </Link>

            <SiteLogo />
          </div>

          {/* Form Content */}
          <div className="bg-white py-8 px-6 shadow-xl rounded-lg border border-gray-100">
            {children}
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-xs text-gray-500">
              By continuing, you agree to our{" "}
              <Link
                href="/terms"
                className="text-[#097B35] hover:text-[#00662A]"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="text-[#097B35] hover:text-[#00662A]"
              >
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Image/Banner */}
      <div className="hidden lg:flex lg:flex-1 lg:flex-col lg:justify-center">
        <div className="relative h-full">
          <Image
            src="/assets/images/filterimage.png"
            alt="Natural medicine products"
            fill
            className="object-cover"
            priority
          />

          {/* Overlay with content */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#097B35]/80 to-[#00662A]/80 flex items-center justify-center">
            <div className="text-center text-white p-8">
              <h3 className="text-4xl font-bold mb-4">
                Welcome to Nature Cure Food
              </h3>
              <p className="text-xl mb-6 opacity-90">
                Your trusted source for authentic ayurvedic and herbal medicines
              </p>
              <div className="flex items-center justify-center space-x-6 text-sm opacity-75">
                <div className="flex items-center">
                  <svg
                    className="mr-2 h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  100% Natural
                </div>
                <div className="flex items-center">
                  <svg
                    className="mr-2 h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Fast Delivery
                </div>
                <div className="flex items-center">
                  <svg
                    className="mr-2 h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Trusted Products
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
