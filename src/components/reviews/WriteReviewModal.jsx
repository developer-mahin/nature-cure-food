"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Button as MuiButton,
  TextField,
  Rating,
} from "@mui/material";
import { X, Upload, Image as ImageIcon, Star } from "lucide-react";
import { toast } from "sonner";

const WriteReviewModal = ({ open, onClose, productName }) => {
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [images, setImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    // Limit to 5 images
    if (images.length + files.length > 5) {
      toast.error("You can upload a maximum of 5 images");
      return;
    }

    // Create preview URLs for the images
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      name: file.name,
    }));

    setImages([...images, ...newImages]);
  };

  const handleRemoveImage = (index) => {
    const newImages = [...images];
    // Revoke the object URL to free up memory
    URL.revokeObjectURL(newImages[index].preview);
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }

    if (!title.trim()) {
      toast.error("Please enter a review title");
      return;
    }

    if (!comment.trim()) {
      toast.error("Please write your review");
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      toast.success("Review submitted successfully!");
      setIsSubmitting(false);
      handleClose();
    }, 1500);
  };

  const handleClose = () => {
    // Clean up image previews
    images.forEach((img) => URL.revokeObjectURL(img.preview));

    // Reset form
    setRating(0);
    setTitle("");
    setComment("");
    setImages([]);
    setIsSubmitting(false);

    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "12px",
          margin: { xs: "16px", sm: "32px" },
          width: { xs: "calc(100% - 32px)", sm: "100%" },
        },
      }}
    >
      <DialogTitle>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Write a Review</h2>
            <p className="text-sm text-gray-500 mt-1">{productName}</p>
          </div>
          <IconButton onClick={handleClose} size="small">
            <X className="w-5 h-5" />
          </IconButton>
        </div>
      </DialogTitle>

      <DialogContent>
        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {/* Rating Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Rating <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-2">
              <Rating
                value={rating}
                onChange={(event, newValue) => setRating(newValue)}
                size="large"
                precision={1}
                emptyIcon={<Star className="w-8 h-8 text-gray-300" />}
                icon={<Star className="w-8 h-8 text-yellow-400 fill-current" />}
              />
              <span className="text-lg font-semibold text-gray-700">
                {rating > 0 ? `${rating}.0` : "Select rating"}
              </span>
            </div>
          </div>

          {/* Review Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Review Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Give your review a title"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              maxLength={100}
            />
            <div className="text-xs text-gray-500 mt-1 text-right">
              {title.length}/100
            </div>
          </div>

          {/* Review Comment */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Review <span className="text-red-500">*</span>
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your experience with this product"
              rows={5}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-none"
              maxLength={500}
            />
            <div className="text-xs text-gray-500 mt-1 text-right">
              {comment.length}/500
            </div>
          </div>

          {/* Image Upload Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Add Photos (Optional)
            </label>
            <p className="text-xs text-gray-500 mb-3">
              Upload up to 5 images to help others see your experience
            </p>

            {/* Image Preview Grid */}
            {images.length > 0 && (
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-3">
                {images.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={image.preview}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-20 object-cover rounded-lg border border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Upload Button */}
            {images.length < 5 && (
              <label className="flex items-center justify-center gap-2 w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 cursor-pointer transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <Upload className="w-5 h-5 text-gray-500" />
                <span className="text-sm text-gray-600">
                  Click to upload images ({images.length}/5)
                </span>
              </label>
            )}
          </div>

          {/* Submit Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="w-full sm:w-auto px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:flex-1 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting..." : "Submit Review"}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default WriteReviewModal;
