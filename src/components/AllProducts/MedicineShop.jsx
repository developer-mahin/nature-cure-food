"use client";

import FilterSidebar from "@/components/AllProducts/FilterSidebar";
import ProductCard from "@/components/main/Homepage/ProductSection/ProductCard";
import { staticProducts } from "@/lib/staticProducts";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { assets } from "../../../public/assets";

export default function MedicineShop() {
  const [filters, setFilters] = useState({
    inStock: false,
    outOfStock: true,
    categories: [],
  });
  const [priceRange, setPriceRange] = useState([0, 4000]);
  const [appliedPriceRange, setAppliedPriceRange] = useState([0, 4000]);
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState("grid-large");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handlePriceChange = (range) => {
    setPriceRange(range);
  };

  const handleApplyPrice = () => {
    setAppliedPriceRange(priceRange);
  };

  const handleAddToCart = (product) => {
    alert(`Added ${product.name} to cart!`);
  };

  const filteredProducts = staticProducts.filter((product) => {
    if (filters.inStock && !product.inStock) return false;
    if (filters.outOfStock && product.inStock) return false;
    if (!filters.inStock && !filters.outOfStock) return false;

    if (
      filters.categories.length > 0 &&
      !filters.categories.includes(product.category)
    ) {
      return false;
    }

    if (
      product.price < appliedPriceRange[0] ||
      product.price > appliedPriceRange[1]
    ) {
      return false;
    }

    return true;
  });

  return (
    <div className="min-h-screen">
      <div className="relative h-60 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl text-black font-bold">Medicine Shop</h1>
            <button
              className="lg:hidden p-2 bg-green-600 text-white rounded"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
          </div>
          <p className="text-black">Home &gt; Shop Page</p>
        </div>
        <Image
          src={assets.images.productBanner}
          alt="Herbs"
          className="absolute right-0 top-0  object-cover opacity-80 hidden lg:block w-full"
          width={1000}
          height={500}
        />
      </div>

      <motion.div
        layout
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className={`${
          viewMode === "grid-xlarge" ? "max-w-[1460px]" : "max-w-7xl"
        } mx-auto px-4 py-6`}
      >
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-72 flex-shrink-0">
            <FilterSidebar
              filters={filters}
              onFilterChange={handleFilterChange}
              priceRange={priceRange}
              onPriceChange={handlePriceChange}
              onApplyPrice={handleApplyPrice}
              isOpen={sidebarOpen}
              onClose={() => setSidebarOpen(false)}
            />
          </div>

          <div className="flex-1">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 bg-white p-4 rounded-lg border">
              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-600">Sort by:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border rounded px-3 py-1 text-sm"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name">Name: A-Z</option>
                </select>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 border rounded cursor-pointer ${
                    viewMode === "grid" ? "bg-gray-200" : ""
                  }`}
                >
                  <div className="w-3 h-4  grid grid-cols-2 gap-1">
                    <div
                      className={`rounded ${
                        viewMode === "grid" ? "bg-gray-600" : "bg-gray-600"
                      }`}
                    ></div>
                    <div
                      className={`rounded ${
                        viewMode === "grid" ? "bg-gray-600" : "bg-gray-600"
                      }`}
                    ></div>
                  </div>
                </button>
                <button
                  onClick={() => setViewMode("grid-large")}
                  className={`p-2 border rounded cursor-pointer ${
                    viewMode === "grid-large" ? "bg-gray-200" : ""
                  }`}
                >
                  <div className="w-5 h-4 grid grid-cols-3 gap-1">
                    <div className="bg-gray-600 rounded"></div>
                    <div className="bg-gray-600 rounded"></div>
                    <div className="bg-gray-600 rounded"></div>
                  </div>
                </button>
                <button
                  onClick={() => setViewMode("grid-xlarge")}
                  className={`p-2 border rounded  cursor-pointer ${
                    viewMode === "grid-xlarge" ? "bg-gray-200" : ""
                  }`}
                >
                  <div className="w-7 h-4 grid grid-cols-4 gap-1 ">
                    <div className="bg-gray-600 rounded"></div>
                    <div className="bg-gray-600 rounded"></div>
                    <div className="bg-gray-600 rounded"></div>
                    <div className="bg-gray-600 rounded"></div>
                  </div>
                </button>
              </div>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg border">
                <p className="text-gray-500">
                  No products found matching your filters.
                </p>
              </div>
            ) : (
              <div
                className={`grid lg:gap-6 gap-3 ${
                  viewMode === "grid"
                    ? "grid-cols-2 sm:grid-cols-2"
                    : viewMode === "grid-large"
                    ? "grid-cols-2 sm:grid-cols-2 lg:grid-cols-3"
                    : viewMode === "grid-xlarge"
                    ? "grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                    : "grid-cols-2"
                }`}
              >
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                    mainClass={viewMode === "grid" && "lg:!h-[600]"}
                    imageClass={viewMode === "grid" && "lg:!h-[400px]"}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
