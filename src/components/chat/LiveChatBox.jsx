"use client";

import { Maximize2, MessageCircle, Minimize2, Send, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function LiveChatBox({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! Welcome to Natural Plus BD. How can I help you today?",
      sender: "support",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: inputMessage,
        sender: "user",
        timestamp: new Date(),
      };

      setMessages([...messages, newMessage]);
      setInputMessage("");

      // Simulate support response
      setTimeout(() => {
        const supportResponse = {
          id: messages.length + 2,
          text: "Thank you for your message! Our support team will respond shortly.",
          sender: "support",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, supportResponse]);
      }, 1000);
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed right-6 bottom-6 z-50 transition-all duration-300 ease-in-out ${
        isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      }`}
      style={{ width: "380px" }}
    >
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#097B35] to-[#0A9742] p-4 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-[#097B35]" />
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <h3 className="font-bold text-base">Live Support</h3>
                <p className="text-xs text-green-100">
                  We're online • Reply in ~2 min
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="hover:bg-white/20 p-1.5 rounded-lg transition-colors"
              >
                {isMinimized ? (
                  <Maximize2 className="w-5 h-5" />
                ) : (
                  <Minimize2 className="w-5 h-5" />
                )}
              </button>
              <button
                onClick={onClose}
                className="hover:bg-white/20 p-1.5 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Chat Body */}
        {!isMinimized && (
          <>
            <div className="h-96 overflow-y-auto p-4 bg-gray-50">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.sender === "user"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[75%] ${
                        message.sender === "user"
                          ? "bg-gradient-to-r from-[#097B35] to-[#0A9742] text-white"
                          : "bg-white text-gray-800 border border-gray-200"
                      } rounded-2xl px-4 py-2.5 shadow-sm`}
                    >
                      <p className="text-sm leading-relaxed">{message.text}</p>
                      <p
                        className={`text-xs mt-1 ${
                          message.sender === "user"
                            ? "text-green-100"
                            : "text-gray-500"
                        }`}
                      >
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-gray-200">
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#097B35] focus:border-transparent text-sm"
                />
                <button
                  type="submit"
                  className="bg-gradient-to-r from-[#097B35] to-[#0A9742] text-white p-2.5 rounded-xl hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!inputMessage.trim()}
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>

              {/* Quick Replies */}
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  onClick={() =>
                    setInputMessage("I need help with product information")
                  }
                  className="text-xs px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
                >
                  Product Info
                </button>
                <button
                  onClick={() =>
                    setInputMessage("What are your shipping options?")
                  }
                  className="text-xs px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
                >
                  Shipping
                </button>
                <button
                  onClick={() => setInputMessage("I want to track my order")}
                  className="text-xs px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
                >
                  Track Order
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
