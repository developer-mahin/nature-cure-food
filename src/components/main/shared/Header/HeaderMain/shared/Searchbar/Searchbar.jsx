"use client";

import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { getAllProducts } from "@/services/products.service";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { GoLinkExternal } from "react-icons/go";
import { assets } from "../../../../../../../../public/assets";

const Searchbar = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [inputText, setInputText] = useState("");
  const [inputFocus, setInputFocus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [totalResults, setTotalResults] = useState(0);
  const searchRef = useRef(null);
  const debounceTimerRef = useRef(null);
  const router = useRouter();

  // Debounced search function - only searches after user stops typing
  const performSearch = useCallback(async (searchTerm) => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      setTotalResults(0);
      return;
    }

    try {
      setIsLoading(true);
      const response = await getAllProducts({
        limit: 8,
        searchTerm: searchTerm.trim(),
      });

      const products = response?.data || [];
      const total =
        response?.totalProducts || response?.total || products.length;

      setSearchResults(products);
      setTotalResults(total);
    } catch (error) {
      console.error("Error searching products:", error);
      setSearchResults([]);
      setTotalResults(0);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Debounce search input - wait 300ms after user stops typing
  useEffect(() => {
    // Clear existing timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // If input is empty, clear results immediately
    if (!inputText.trim()) {
      setSearchResults([]);
      setTotalResults(0);
      setIsLoading(false);
      return;
    }

    // Show loading state immediately when typing
    setIsLoading(true);

    // Set new timer for debounced search
    debounceTimerRef.current = setTimeout(() => {
      performSearch(inputText);
    }, 300); // 300ms delay

    // Cleanup timer on unmount or when inputText changes
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [inputText, performSearch]);

  // Handle initial loading state
  useEffect(() => {
    // Simulate initial load completion after component mounts
    const timer = setTimeout(() => {
      setIsInitialLoad(false);
    }, 800); // 800ms skeleton loading

    return () => clearTimeout(timer);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setInputFocus(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const truncate = (text, maxLength, ellipsis = "...") =>
    text?.length <= maxLength
      ? text
      : text?.slice(0, maxLength - ellipsis?.length) + ellipsis;

  const handleProductClick = (productId) => {
    setInputFocus(false);
    setInputText("");
    router.push(`/product-details/${productId}`);
  };

  const getProductPrice = (product) => {
    const firstVariant = product?.variants?.[0];
    return (
      firstVariant?.discountPrice || firstVariant?.price || product?.price || 0
    );
  };

  // Motion Variants
  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        staggerChildren: 0.08,
      },
    },
    exit: { opacity: 0, y: -10, scale: 0.98, transition: { duration: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  // Show skeleton loader on initial load
  if (isInitialLoad) {
    return (
      <div ref={searchRef} className="relative lg:w-[480px] w-full">
        <Skeleton className="h-12 w-full rounded-full" />
      </div>
    );
  }

  return (
    <div ref={searchRef} className="relative lg:w-[480px] w-full">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <Input
          type="text"
          value={inputText}
          placeholder="Search our Store"
          style={{
            boxShadow:
              "0 4px 10px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)",
          }}
          className="px-6 rounded-full h-12 border border-[#e5e7eb] focus:outline-none focus:ring-2 focus:ring-green-500"
          onChange={(e) => setInputText(e.target.value)}
          onFocus={() => setInputFocus(true)}
        />
      </motion.div>

      {isLoading ? (
        <Loader2 className="absolute top-[15px] right-5 w-4 h-4 animate-spin text-green-600" />
      ) : (
        <Image
          src={assets.icons.searchBar}
          alt="Searchbar"
          width={15}
          height={15}
          className="absolute top-[15px] right-5 text-[1.5rem] text-[#adadad]"
          style={{ width: "auto", height: "auto" }}
        />
      )}

      {/* Animated Dropdown */}
      <AnimatePresence>
        {inputFocus && inputText && (
          <motion.div
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute z-50 bg-white w-full mt-2 shadow-2xl overflow-hidden flex flex-col rounded-lg border border-gray-200 max-h-[400px] overflow-y-auto"
          >
            {isLoading ? (
              <div className="px-4 py-3 space-y-3">
                {/* Skeleton loading for search results */}
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Skeleton className="w-12 h-12 rounded-lg flex-shrink-0" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-3 w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : searchResults.length > 0 ? (
              <>
                {searchResults.map((product) => (
                  <motion.div
                    key={product?.id}
                    variants={itemVariants}
                    whileHover={{ scale: 1.01, backgroundColor: "#f9fafb" }}
                    className="flex items-center justify-between w-full px-4 py-3 cursor-pointer border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors"
                    onClick={() => handleProductClick(product?.id)}
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="w-12 h-12 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden relative">
                        {product?.coverImg || product?.image ? (
                          <Image
                            src={product?.coverImg || product?.image}
                            alt={product?.name}
                            fill
                            sizes="48px"
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <Image
                              src={assets.icons.searchBar}
                              alt="No image"
                              width={20}
                              height={20}
                            />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-gray-900 truncate">
                          {product?.name}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <p className="text-xs text-gray-500">
                            {typeof product?.category === "object"
                              ? product?.category?.name
                              : product?.category}
                          </p>
                          <span className="text-sm font-semibold text-green-600">
                            ৳{getProductPrice(product)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <GoLinkExternal className="text-lg text-gray-400 flex-shrink-0 ml-2" />
                  </motion.div>
                ))}
                {totalResults > searchResults.length && (
                  <div className="px-4 py-3 bg-gray-50 text-center">
                    <button
                      onClick={() => {
                        router.push(`/all-products?search=${inputText}`);
                        setInputFocus(false);
                        setInputText("");
                      }}
                      className="text-sm text-green-600 hover:text-green-700 font-medium"
                    >
                      View all results ({totalResults})
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="px-6 py-8 text-center">
                <p className="text-gray-500 text-sm">
                  No products found for "{inputText}"
                </p>
                <p className="text-gray-400 text-xs mt-2">
                  Try searching with different keywords
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Searchbar;
