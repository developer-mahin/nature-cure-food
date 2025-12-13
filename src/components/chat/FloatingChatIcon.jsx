"use client";

import { MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";

export default function FloatingChatIcon({ onClick, isOpen }) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);

  useEffect(() => {
    // Show icon after a short delay for better UX
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setHasUnread(false);
    }
  }, [isOpen]);

  if (isOpen) return null;

  return (
    <div
      className={`fixed bottom-6 right-6 z-40 transition-all duration-500 ${
        isVisible
          ? "translate-y-0 opacity-100 scale-100"
          : "translate-y-10 opacity-0 scale-50"
      }`}
    >
      <button
        onClick={onClick}
        className="relative group bg-gradient-to-r from-[#097B35] to-[#0A9742] text-white w-16 h-16 rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300 flex items-center justify-center animate-bounce hover:animate-none"
        aria-label="Open live chat"
      >
        {/* Pulsing effect */}
        <div className="absolute inset-0 rounded-full bg-[#097B35] animate-ping opacity-20"></div>

        {/* Icon */}
        <MessageCircle className="w-8 h-8 relative z-10" />

        {/* Unread notification badge */}
        {hasUnread && (
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full border-2 border-white flex items-center justify-center">
            <span className="text-xs font-bold">1</span>
          </div>
        )}

        {/* Tooltip */}
        <div className="absolute right-full mr-3 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
          Need help? Chat with us!
          <div className="absolute top-1/2 -right-1 transform -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
        </div>
      </button>

      {/* Welcome message popup */}
      {!isOpen && isVisible && (
        <div className="absolute bottom-20 right-0 bg-white rounded-2xl shadow-xl p-4 w-64 animate-slideInUp border border-gray-200">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-[#097B35] to-[#0A9742] rounded-full flex items-center justify-center flex-shrink-0">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-gray-800 text-sm mb-1">
                👋 Hi there!
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Have questions? We're here to help! Click the button to start a
                chat.
              </p>
            </div>
            <button
              onClick={() => setIsVisible(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
