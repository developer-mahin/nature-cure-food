"use client";

import { staticProducts } from "@/lib/staticProducts";
import { SlidersHorizontal, X } from "lucide-react";
import Image from "next/image";
import { assets } from "../../../public/assets";
import { Button } from "../ui/button";
const categories = [
  { name: "Herbal", count: 22 },
  { name: "Ayurvedic", count: 20 },
  { name: "Unani", count: 25 },
  { name: "Sexual", count: 9 },
  { name: "Combo", count: 26 },
  { name: "Sorbiol", count: 0 },
];
const FilterSidebar = ({
  filters,
  onFilterChange,
  priceRange,
  onPriceChange,
  onApplyPrice,
  isOpen,
  onClose,
}) => {
  const sidebarClasses = `
    fixed lg:relative top-0 left-0 h-full lg:h-auto w-80 lg:w-auto
    bg-white lg:bg-transparent z-50 lg:z-auto
    transform transition-transform duration-300 ease-in-out
    ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
    overflow-y-auto lg:overflow-visible
    shadow-xl lg:shadow-none
  `;

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      <div className={sidebarClasses}>
        <div className="lg:hidden flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <SlidersHorizontal size={20} />
            Filters
          </h2>
          <button onClick={onClose} className="p-2">
            <X size={24} />
          </button>
        </div>

        <div className="p-4 lg:p-0 space-y-4">
          {/* Availability Filter */}
          <div className="bg-[#EEFFF0] rounded-lg border p-4">
            <h3 className="font-semibold mb-3">Availability</h3>
            <div className="space-y-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.inStock}
                  onChange={(e) => onFilterChange("inStock", e.target.checked)}
                  className="w-4 h-4 accent-[#097B35] cursor-pointer"
                />
                <span className="text-sm">
                  In stock ({staticProducts.filter((p) => p.inStock).length})
                </span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.outOfStock}
                  onChange={(e) =>
                    onFilterChange("outOfStock", e.target.checked)
                  }
                  className="w-4 h-4 accent-[#097B35] cursor-pointer"
                />
                <span className="text-sm">
                  Out of stock (
                  {staticProducts.filter((p) => !p.inStock).length})
                </span>
              </label>
            </div>
          </div>

          {/* Category Filter */}
          <div className="bg-[#EEFFF0] rounded-lg border p-4">
            <h3 className="font-semibold mb-3">Medicine Category</h3>
            <div className="space-y-4">
              {categories.map((cat) => (
                <label
                  key={cat.name}
                  className="flex items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={filters.categories.includes(cat.name)}
                      onChange={(e) => {
                        const newCategories = e.target.checked
                          ? [...filters.categories, cat.name]
                          : filters.categories.filter((c) => c !== cat.name);
                        onFilterChange("categories", newCategories);
                      }}
                      className="w-4 h-4 accent-[#097B35] cursor-pointer"
                    />
                    <span className="text-sm">{cat.name}</span>
                  </div>
                  <span className="text-sm text-gray-500">{cat.count}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Filter */}
          <div className="bg-[#EEFFF0] rounded-lg border p-4">
            <h3 className="font-semibold mb-3">Filter by Price</h3>
            <input
              type="range"
              min="0"
              max="4000"
              value={priceRange[1]}
              onChange={(e) =>
                onPriceChange([priceRange[0], parseInt(e.target.value)])
              }
              className="w-full mb-3 accent-[#097B35]"
            />
            <div className="text-sm mb-3">
              Price Range:{" "}
              <span className="font-semibold">
                ৳{priceRange[0]} - ৳{priceRange[1]}
              </span>
            </div>
            <Button onClick={onApplyPrice} className="w-full">
              FILTER
            </Button>
          </div>

          {/* Featured Product */}
          <div
            style={{
              backgroundImage: `url('/assets/images/filterimage.png')`,
            }}
            className="w-full lg:h-[380px] h-[380px] bg-no-repeat bg-center bg-cover rounded"
          >
            <div className="bg-gradient-to-br from-[#eefff0e0] to-[#eefff0e0] rounded lg:h-[380px] h-[380px] p-6 flex items-center flex-col">
              <Image
                src={assets.images.dummyProduct}
                width={500}
                height={500}
                alt=""
                className="w-36 mt-6"
              />
              <p className="text-2xl font-semibold mt-12">30% OFF</p>
              <p className="font-semibold text-lg">Prodietica (20 Caps)</p>
              <Button className="w-fit mt-10">Buy Now</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;
