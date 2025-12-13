"use client";

import React, { useState, useEffect } from "react";
import {
  Star,
  MessageSquare,
  Filter,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import ReviewStatistics from "./ReviewStatistics";
import ReviewCard from "./ReviewCard";
import WriteReviewModal from "./WriteReviewModal";
import { generateReviews } from "@/lib/reviewData";

const ReviewsSection = ({ product }) => {
  const [selectedRating, setSelectedRating] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [isWriteReviewOpen, setIsWriteReviewOpen] = useState(false);
  const reviewsPerPage = 5;

  const reviews = generateReviews(product.id);

  // Filter reviews based on selected rating
  const filteredReviews = reviews.filter((review) => {
    if (selectedRating === "all") return true;
    return review.rating === parseInt(selectedRating);
  });

  // Sort reviews
  const sortedReviews = filteredReviews.sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.date) - new Date(a.date);
      case "oldest":
        return new Date(a.date) - new Date(b.date);
      case "highest":
        return b.rating - a.rating;
      case "lowest":
        return a.rating - b.rating;
      case "most_helpful":
        return b.helpful - a.helpful;
      default:
        return 0;
    }
  });

  // Calculate pagination
  const totalReviews = sortedReviews.length;
  const totalPages = Math.ceil(totalReviews / reviewsPerPage);
  const startIndex = (currentPage - 1) * reviewsPerPage;
  const endIndex = startIndex + reviewsPerPage;
  const displayedReviews = sortedReviews.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedRating, sortBy]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Scroll to reviews section instead of top
    const reviewsSection = document.getElementById("reviews-section");
    if (reviewsSection) {
      reviewsSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const renderStars = (rating, size = "w-4 h-4") => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className={`${size} text-yellow-400 fill-current`} />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <Star className={`${size} text-gray-300`} />
          <div className="absolute inset-0 overflow-hidden w-1/2">
            <Star className={`${size} text-yellow-400 fill-current`} />
          </div>
        </div>
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className={`${size} text-gray-300`} />
      );
    }

    return stars;
  };

  return (
    <div id="reviews-section" className="mt-8">
      {/* Reviews Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <MessageSquare className="w-6 h-6 text-green-600" />
          <h2 className="text-2xl font-bold text-gray-900">Customer Reviews</h2>
          <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full">
            {renderStars(product.rating || 4.5, "w-4 h-4")}
            <span className="text-sm font-medium">
              {product.rating || 4.5} ({product.totalReviews || 0} reviews)
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Review Statistics */}
        <div className="lg:col-span-1">
          <ReviewStatistics
            rating={product.rating || 4.5}
            totalReviews={product.totalReviews || 0}
            ratingDistribution={product.ratingDistribution || {}}
          />
        </div>

        {/* Reviews List */}
        <div className="lg:col-span-2">
          {/* Filter and Sort Controls */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
            <div className="flex flex-wrap items-center gap-4">
              {/* Rating Filter */}
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <select
                  value={selectedRating}
                  onChange={(e) => setSelectedRating(e.target.value)}
                  className="border border-gray-300 rounded px-3 py-1 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="all">All Ratings</option>
                  <option value="5">5 Stars</option>
                  <option value="4">4 Stars</option>
                  <option value="3">3 Stars</option>
                  <option value="2">2 Stars</option>
                  <option value="1">1 Star</option>
                </select>
              </div>

              {/* Sort Options */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded px-3 py-1 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="highest">Highest Rating</option>
                  <option value="lowest">Lowest Rating</option>
                  <option value="most_helpful">Most Helpful</option>
                </select>
              </div>

              {/* Results Count */}
              <div className="text-sm text-gray-500 ml-auto">
                Showing {startIndex + 1}-{Math.min(endIndex, totalReviews)} of{" "}
                {totalReviews} reviews
              </div>
            </div>
          </div>

          {/* Reviews */}
          <div className="space-y-6">
            {displayedReviews.length > 0 ? (
              displayedReviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))
            ) : (
              <div className="text-center py-8">
                <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">
                  No reviews found for the selected criteria.
                </p>
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8">
              <div className="flex flex-wrap items-center justify-center gap-2">
                {/* Previous Button */}
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>

                {/* Page Numbers */}
                <div className="flex gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => {
                      // Show first page, last page, current page, and pages around current
                      const showPage =
                        page === 1 ||
                        page === totalPages ||
                        (page >= currentPage - 1 && page <= currentPage + 1);

                      // Show ellipsis
                      const showEllipsisBefore =
                        page === currentPage - 2 && currentPage > 3;
                      const showEllipsisAfter =
                        page === currentPage + 2 &&
                        currentPage < totalPages - 2;

                      if (showEllipsisBefore || showEllipsisAfter) {
                        return (
                          <span key={page} className="px-3 py-2 text-gray-500">
                            ...
                          </span>
                        );
                      }

                      if (!showPage) return null;

                      return (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                            currentPage === page
                              ? "bg-green-600 text-white"
                              : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          {page}
                        </button>
                      );
                    }
                  )}
                </div>

                {/* Next Button */}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>

              {/* Mobile-friendly page info */}
              <div className="text-center mt-4 text-sm text-gray-600">
                Page {currentPage} of {totalPages}
              </div>
            </div>
          )}

          {/* Write Review Button */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={() => setIsWriteReviewOpen(true)}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium transition-colors"
            >
              Write a Review
            </button>
          </div>

          {/* Write Review Modal */}
          <WriteReviewModal
            open={isWriteReviewOpen}
            onClose={() => setIsWriteReviewOpen(false)}
            productName={product?.name || "Product"}
          />
        </div>
      </div>
    </div>
  );
};

export default ReviewsSection;
