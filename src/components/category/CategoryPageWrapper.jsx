"use client";

import { Suspense } from "react";
import CategoryPage from "./CategoryPage";

// Loading fallback component
function CategoryPageFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading...</p>
      </div>
    </div>
  );
}

// Wrapper component with Suspense boundary
export default function CategoryPageWrapper({ categorySlug }) {
  return (
    <Suspense fallback={<CategoryPageFallback />}>
      <CategoryPage categorySlug={categorySlug} />
    </Suspense>
  );
}
