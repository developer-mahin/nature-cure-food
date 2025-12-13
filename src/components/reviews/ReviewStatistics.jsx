"use client";

import React from "react";
import { Star } from "lucide-react";

const ReviewStatistics = ({ rating, totalReviews, ratingDistribution }) => {
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

  const getPercentage = (count) => {
    return totalReviews > 0 ? Math.round((count / totalReviews) * 100) : 0;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>

      {/* Overall Rating */}
      <div className="flex items-center gap-4 mb-6">
        <div className="text-center">
          <div className="text-3xl font-bold text-gray-900">{rating}</div>
          <div className="flex items-center justify-center mt-1">
            {renderStars(rating, "w-5 h-5")}
          </div>
          <div className="text-sm text-gray-500 mt-1">
            Based on {totalReviews} reviews
          </div>
        </div>

        <div className="flex-1">
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((star) => (
              <div key={star} className="flex items-center gap-2">
                <span className="text-sm font-medium w-6">{star}</span>
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${getPercentage(ratingDistribution[star] || 0)}%`,
                    }}
                  />
                </div>
                <span className="text-sm text-gray-500 w-8">
                  {ratingDistribution[star] || 0}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Review Summary */}
      <div className="border-t pt-4">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-lg font-semibold text-green-600">
              {rating >= 4.5
                ? "Excellent"
                : rating >= 4.0
                ? "Very Good"
                : rating >= 3.5
                ? "Good"
                : rating >= 3.0
                ? "Average"
                : "Below Average"}
            </div>
            <div className="text-sm text-gray-500">Overall Rating</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-blue-600">
              {getPercentage(
                (ratingDistribution[5] || 0) + (ratingDistribution[4] || 0)
              )}
              %
            </div>
            <div className="text-sm text-gray-500">Would Recommend</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewStatistics;
