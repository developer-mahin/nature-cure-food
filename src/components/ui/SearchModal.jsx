"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { getAllProducts } from "@/services/products.service";
import { Dialog, Slide } from "@mui/material";
import { ExternalLink, Search, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useRef, useState } from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const SearchModal = ({ open, onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);
  const debounceTimerRef = useRef(null);
  const router = useRouter();

  // Auto-focus input when modal opens
  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => {
        inputRef.current.focus();
      }, 100);
    }
  }, [open]);

  // Clear search when modal closes
  useEffect(() => {
    if (!open) {
      setSearchQuery("");
      setSearchResults([]);
      setTotalResults(0);
      setIsLoading(false);
    }
  }, [open]);

  // Debounced search function
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
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setTotalResults(0);
      setIsLoading(false);
      return;
    }

    // Show loading state immediately when typing
    setIsLoading(true);

    // Set new timer for debounced search
    debounceTimerRef.current = setTimeout(() => {
      performSearch(searchQuery);
    }, 300); // 300ms delay

    // Cleanup timer on unmount or when searchQuery changes
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [searchQuery, performSearch]);

  const handleProductClick = (productId) => {
    router.push(`/product-details/${productId}`);
    onClose();
  };

  const getProductPrice = (product) => {
    const firstVariant = product?.variants?.[0];
    return (
      firstVariant?.discountPrice || firstVariant?.price || product?.price || 0
    );
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          position: "fixed",
          top: "80px",
          left: "16px",
          right: "16px",
          margin: 0,
          borderRadius: "12px",
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)",
          maxWidth: "calc(100vw - 32px)",
          width: "auto",
          maxHeight: "calc(100vh - 120px)",
        },
      }}
      BackdropProps={{
        sx: {
          backgroundColor: "rgba(0, 0, 0, 0.3)",
        },
      }}
    >
      <div className="flex flex-col max-h-[calc(100vh-120px)]">
        {/* Search Input */}
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search products..."
              autoComplete="off"
              className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-base"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="h-4 w-4 text-gray-400" />
              </button>
            )}
          </div>
        </div>

        {/* Search Results */}
        <div className="flex-1 overflow-y-auto">
          {isLoading ? (
            <div className="p-4 space-y-3">
              {/* Skeleton loading for search results */}
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center gap-3">
                  <Skeleton className="w-14 h-14 rounded-lg flex-shrink-0" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : searchQuery && searchResults.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {searchResults.map((product) => (
                <div
                  key={product?.id}
                  onClick={() => handleProductClick(product?.id)}
                  className="flex items-center gap-3 p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <div className="w-14 h-14 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden relative">
                    {product?.coverImg || product?.image ? (
                      <Image
                        src={product?.coverImg || product?.image}
                        alt={product?.name}
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <Search className="w-6 h-6" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-gray-900 truncate mb-1">
                      {product?.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">
                        {typeof product?.category === "object"
                          ? product?.category?.name
                          : product?.category}
                      </span>
                      <span className="text-sm font-semibold text-green-600">
                        ৳{getProductPrice(product)}
                      </span>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400 flex-shrink-0" />
                </div>
              ))}
              {totalResults > searchResults.length && (
                <div className="p-4 bg-gray-50 text-center">
                  <button
                    onClick={() => {
                      router.push(`/all-products?search=${searchQuery}`);
                      onClose();
                    }}
                    className="text-sm text-green-600 hover:text-green-700 font-medium"
                  >
                    View all results ({totalResults})
                  </button>
                </div>
              )}
            </div>
          ) : searchQuery && searchResults.length === 0 && !isLoading ? (
            <div className="px-6 py-12 text-center">
              <p className="text-gray-500 text-sm">
                No products found for "{searchQuery}"
              </p>
              <p className="text-gray-400 text-xs mt-2">
                Try searching with different keywords
              </p>
            </div>
          ) : (
            <div className="px-6 py-8 text-center">
              <Search className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 text-sm">
                Start typing to search products
              </p>
              <p className="text-gray-400 text-xs mt-2">
                Search by product name, category, or brand
              </p>
            </div>
          )}
        </div>
      </div>
    </Dialog>
  );
};

export default SearchModal;
