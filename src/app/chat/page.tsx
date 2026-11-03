"use client";

import React, { useRef, useEffect, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MyHayatButton } from "@/components/ui/MyHayatButton";
import { useTranslation } from "@/lib/i18n";
import { Send, RotateCcw, MessageCircle, AlertTriangle } from "lucide-react";
import Link from "next/link";

function ChatBubble({ role, text }: { role: "user" | "assistant"; text: string }) {
  const isBot = role === "assistant";
  return (
    <div className={`flex ${isBot ? "justify-start" : "justify-end"} mb-3`}>
      <div
        className={`
          max-w-[80%] px-5 py-3 rounded-[1.5rem] text-[15px] leading-relaxed whitespace-pre-line
          ${isBot
            ? "bg-white dark:bg-[#251320] text-gray-800 dark:text-gray-200 rounded-bl-md border-2 border-myhayat-pink/20 shadow-sm"
            : "bg-myhayat-pink text-white rounded-br-md shadow-md"
          }
        `}
      >
        {isBot && <span className="text-xs font-bold text-myhayat-pink block mb-1">My Hayat ðŸ’›</span>}
        {text}
      </div>
    </div>
  );
}

export default function ChatPage() {
  const { t } = useTranslation();
  const [chatError, setChatError] = useState<string | null>(null);
  const [input, setInput] = useState("");

  const { messages, sendMessage, status, setMessages } = useChat({
    onError: (error) => {
      console.error("Chat error:", error);
     ¶»§q«^