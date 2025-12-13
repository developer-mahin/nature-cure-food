"use client";

import React, { useState } from "react";
import { Star, ThumbsUp, User, Calendar, Shield } from "lucide-react";

const ReviewCard = ({ review }) => {
  const [isHelpful, setIsHelpful] = useState(false);
  const [helpfulCount, setHelpfulCount] = useState(review.helpful);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`w-4 h-4 ${
            i <= rating ? "text-yellow-400 fill-current" : "text-gray-300"
          }`}
        />
      );
    }
    return stars;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleHelpful = () => {
    if (!isHelpful) {
      setIsHelpful(true);
      setHelpfulCount(helpfulCount + 1);
    }
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
      {/* Review Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
            {getInitials(review.author)}
          </div>

          {/* Author Info */}
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-semibold text-gray-900">{review.author}</h4>
              {review.verified && (
                <div className="flex items-center gap-1 text-green-600">
                  <Shield className="w-3 h-3" />
                  <span className="text-xs font-medium">Verified</span>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Calendar className="w-3 h-3" />
              <span>{formatDate(review.date)}</span>
            </div>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1">
          {renderStars(review.rating)}
        </div>
      </div>

      {/* Review Content */}
      <div className="mb-4">
        <h5 className="font-semibold text-gray-900 mb-2">{review.title}</h5>
        <p className="text-gray-700 leading-relaxed">{review.comment}</p>
      </div>

      {/* Review Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <button
          onClick={handleHelpful}
          disabled={isHelpful}
          className={`flex items-center gap-2 text-sm transition-colors ${
            isHelpful
              ? "text-green-600 cursor-default"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          <ThumbsUp className="w-4 h-4" />
          <span>{isHelpful ? "Helpful" : "Was this helpful?"}</span>
          <span className="text-xs">({helpfulCount})</span>
        </button>

        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <User className="w-3 h-3" />
            <span>Verified Purchase</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
