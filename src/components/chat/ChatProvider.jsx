"use client";

import { createContext, useContext, useState } from "react";
import FloatingChatIcon from "./FloatingChatIcon";
import LiveChatBox from "./LiveChatBox";

const ChatContext = createContext(null);

export function ChatProvider({ children }) {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const openChat = () => setIsChatOpen(true);
  const closeChat = () => setIsChatOpen(false);
  const toggleChat = () => setIsChatOpen(!isChatOpen);

  return (
    <ChatContext.Provider
      value={{ isChatOpen, openChat, closeChat, toggleChat }}
    >
      {children}
      <FloatingChatIcon onClick={openChat} isOpen={isChatOpen} />
      <LiveChatBox isOpen={isChatOpen} onClose={closeChat} />
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within ChatProvider");
  }
  return context;
}
