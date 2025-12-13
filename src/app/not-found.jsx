import SiteLogo from "@/components/common/SiteLogo";
import Container from "@/components/reusable/Container";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata = {
  title: "404 - Page Not Found | Nature Cure Food",
  description:
    "The page you're looking for doesn't exist. Return to Nature Cure Food to continue shopping for ayurvedic and herbal medicines.",
  robots: "noindex, follow",
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-12 px-4">
      <Container className="flex flex-col items-center justify-center text-center">
        {/* Logo */}
        <div className="mb-8 animate-fade-in">
          <SiteLogo />
        </div>

        {/* 404 Number with Animation */}
        <div className="relative mb-6 animate-slide-up">
          <h1 className="text-9xl md:text-[12rem] font-bold text-black leading-none font-playfair">
            404
          </h1>
          <div className="absolute inset-0 text-9xl md:text-[12rem] font-bold text-gray-300 blur-2xl -z-10 font-playfair">
            404
          </div>
        </div>

        {/* Main Message */}
        <div
          className="max-w-2xl mx-auto space-y-4 animate-slide-up "
          style={{ animationDelay: "0.1s" }}
        >
          <h2 className="text-3xl md:text-4xl font-bold  font-hind">
            Oops! Page Not Found
          </h2>
          <p className="text-lg md:text-xl text-gray-600 font-open-sans">
            The page you're looking for seems to have wandered off into the
            natural world. Don't worry, we'll help you find your way back!
          </p>
        </div>

        {/* Decorative Elements */}
        <div className="relative w-full max-w-md mt-8 mb-12">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary-200 rounded-full opacity-20 blur-3xl animate-pulse"></div>
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-secondary-300 rounded-full opacity-30 blur-2xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        {/* Action Buttons */}
        <div
          className="flex flex-col sm:flex-row gap-4 items-center justify-center animate-slide-up"
          style={{ animationDelay: "0.2s" }}
        >
          <Button
            asChild
            size="lg"
            variant="primary"
            className="min-w-[200px] text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Link href="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Go to Homepage
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="min-w-[200px] text-base font-semibold border-2 hover:shadow-lg transition-all duration-300"
          >
            <Link href="/all-products">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              Browse Products
            </Link>
          </Button>
        </div>

        {/* Helpful Links */}
        <div
          className="mt-12 pt-8 border-t border-gray-200 w-full max-w-2xl animate-fade-in"
          style={{ animationDelay: "0.3s" }}
        >
          <p className="text-sm text-gray-500 mb-4 font-open-sans">
            You might be looking for:
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link
              href="/all-products"
              className="text-primary-600 hover:text-primary-700 font-medium underline-offset-4 hover:underline transition-colors font-open-sans"
            >
              All Products
            </Link>
            <span className="text-gray-300">•</span>
            <Link
              href="/herbal-medicine"
              className="text-primary-600 hover:text-primary-700 font-medium underline-offset-4 hover:underline transition-colors font-open-sans"
            >
              Herbal Medicine
            </Link>
            <span className="text-gray-300">•</span>
            <Link
              href="/combo-offer"
              className="text-primary-600 hover:text-primary-700 font-medium underline-offset-4 hover:underline transition-colors font-open-sans"
            >
              Combo Offers
            </Link>
            <span className="text-gray-300">•</span>
            <Link
              href="/cart"
              className="text-primary-600 hover:text-primary-700 font-medium underline-offset-4 hover:underline transition-colors font-open-sans"
            >
              Shopping Cart
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
